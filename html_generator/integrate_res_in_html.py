#!/usr/bin/python3

import os
import time
import sys
from html.parser import HTMLParser
import base64
import simplejson
import math
import glob
from pathlib import Path

if sys.getdefaultencoding() != 'utf-8':
    reload(sys)
    sys.setdefaultencoding('utf-8')

settingMatchKey = '{#settings}'
mainMatchKey = '{#main}'
engineMatchKey = '{#cocosengine}'
mintegralMatchKey = '{#mintegral}'
projectMatchKey = '{#project}'
resMapMatchKey = '{#resMap}'
ttfMapMatchKey = '{#ttfMap}'

mintegralScript = '''window.gameReady && window.gameReady();'''

fileByteList = ['.png', '.jpg', '.mp3', '.ttf', '.plist', 'txt']
additonjs = ["applovin.js", "google.js", "ironsource.js", "mintegral.js", "unity.js","vungle.js","facebook.js","pangle.js","adcolony.js"]

base64PrefixList = {
  '.png' : 'data:image/png;base64,',
  '.jpg' : 'data:image/jpeg;base64,',
  '.mp3' : '',
  '.ttf' : '',
  '.plist' : 'data:text/plist;base64,'
}

def read_in_chunks(filePath):
    extName = os.path.splitext(filePath)[1]
    if extName in fileByteList:
        file_object = open(filePath, 'rb')
        base64Str = base64.b64encode(file_object.read())
        base64Prefix = base64PrefixList[extName]
        if base64Prefix != None:
            base64Str = bytes(base64Prefix, 'utf-8') + base64Str
            return base64Str
    elif extName == '':
        return None

    file_object = open(filePath, encoding='utf-8')
    return file_object.read()

def writeToPath(path, data):
    with open(path,'w', encoding='utf-8') as f:
        f.write(data)

def getResMap(jsonObj, path, resPath):
    fileList = os.listdir(path)
    for fileName in fileList:
        absPath = path + '/' + fileName
        if (os.path.isdir(absPath)):
            getResMap(jsonObj, absPath, resPath)
        elif (os.path.isfile(absPath) and absPath.find("main/index.js") == -1):
            dataStr = read_in_chunks(absPath)
            if dataStr != None:
                absPath = absPath.replace(resPath + '/', '')
                jsonObj[absPath] = dataStr

def getResMapScript(resPath):
    jsonObj = {}
    getResMap(jsonObj, resPath, resPath)
    jsonStr = simplejson.dumps(jsonObj)
    resStr = str("window.resMap = ") + jsonStr
    return resStr

# This issue is fixed in Cocos Creator 2.x
def fixEngineError(engineStr):
    newEngineStr = engineStr.replace("t.content instanceof Image", "t.content.tagName === \"IMG\"", 1)
    return newEngineStr

def addPlistSupport(mainStr):
    newMainStr = mainStr.replace("json: jsonBufferHandler,", "json: jsonBufferHandler, plist: jsonBufferHandler,", 1)
    return newMainStr

def findFileStartsWith(path):
	l = glob.glob(path)
	if len(l) > 0:
		return l[0]
	return ""
pathFolder = "./Tatoo_v1_/"
def writeNetHtml(js, html,name="index.html"):
	net = os.path.splitext(js)[0].capitalize()
	if not os.path.exists(f"{pathFolder}{net}"):
		os.makedirs(f"{pathFolder}{net}")
	print(f"create html for: {net} {js}")
	newpath = f"{pathFolder}{net}/{name}"
	if os.path.exists(newpath):
		os.remove(newpath)
	jsContent = Path(f"../html_generator/{js}").read_text()

	i = html.index("</head>")
	newhtml = html[:i] + jsContent + html[i:]
	if "google" in js.lower():
		newhtml = newhtml.replace('<meta name="ad.size" content="width=100%,height=100%">','<meta name="ad.size" content="width=320,height=480">')
	if any(w in js.lower() for w in ["unity","ironsource"]):
		newhtml = newhtml.replace("(function ()", "function startGame()",1)
		newhtml = "}".join(newhtml.rsplit("})();", 1))

	writeToPath(newpath,newhtml)


def integrate(projectRootPath):
    htmlPath = projectRootPath + '/build/web-mobile/index.html'
    newHtmlPath = './index.html'
    settingScrPath = findFileStartsWith(projectRootPath + '/build/web-mobile/src/settings*.js')
    mainScrPath = findFileStartsWith(projectRootPath + '/build/web-mobile/main*.js')
    engineScrPath = findFileStartsWith(projectRootPath + '/build/web-mobile/cocos2d-js-min*.js')
    projectScrPath = findFileStartsWith(projectRootPath + '/build/web-mobile/assets/main/index*.js')
    projectConfigPath = findFileStartsWith(projectRootPath + '/build/web-mobile/assets/main/config*.json')
    os.rename(projectConfigPath, projectRootPath + '/build/web-mobile/assets/main/config.json')
    projectConfigPath = projectRootPath + '/build/web-mobile/assets/main/config.json'

    resPath = projectRootPath + '/build/web-mobile/assets'
    indexInternalScrPath = findFileStartsWith(projectRootPath + '/build/web-mobile/assets/internal/index*.js')
    indexInternalConfigPath = findFileStartsWith(projectRootPath + '/build/web-mobile/assets/internal/config*.json')
    os.rename(indexInternalConfigPath, projectRootPath + '/build/web-mobile/assets/internal/config.json')
    indexInternalConfigPath = projectRootPath + '/build/web-mobile/assets/internal/config.json'

    htmlStr = read_in_chunks(htmlPath)
    settingsStr = read_in_chunks(settingScrPath)
    htmlStr = htmlStr.replace(settingMatchKey, settingsStr, 1)

    projectStr = read_in_chunks(projectScrPath)
    htmlStr = htmlStr.replace(projectMatchKey, projectStr, 1)

    mainStr = read_in_chunks(mainScrPath)
    mainStr = addPlistSupport(mainStr)
    htmlStr = htmlStr.replace(mainMatchKey, mainStr, 1)

    engineStr = read_in_chunks(engineScrPath)
    engineStr = fixEngineError(engineStr)
    htmlStr = htmlStr.replace(engineMatchKey, engineStr, 1)

    resStr = getResMapScript(resPath)
    htmlStr = htmlStr.replace(resMapMatchKey, resStr, 1)
    htmlStr = htmlStr.replace(mintegralMatchKey, '''window.gameReady && window.gameReady();''', 1)

    writeToPath(newHtmlPath, htmlStr)
    for js in additonjs:
        if js.lower()=="pangle.js":
          writeNetHtml(js, htmlStr, "index.html")
        elif "vungle.js" in js.lower():
          writeNetHtml(js, htmlStr, "ad.html")
        else:
          writeNetHtml(js, htmlStr, "Tatoo_v1_"+js.split(".js")[0].capitalize()+"_Sam_270323.html")
    targetFileSize = os.path.getsize(newHtmlPath)
    targetFileSizeInMegabyte = math.ceil(targetFileSize * 1000 / (1024 * 1024)) / 1000
    print("===================  All Done! =================== ")
    print("Target file = {}, with size {}M".format(newHtmlPath, targetFileSizeInMegabyte))

if __name__ == '__main__':
    workDir = os.getcwd() + "/.."
    integrate(workDir)
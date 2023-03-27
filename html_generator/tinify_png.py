#!/usr/bin/python3

import tinify
import sys
from os import path
import os
import os.path  
ImageFilePath = "build/web-mobile/assets"
apiKey = "DWsQBQtnHWTDhFLJ0XtPjkznWmz7KVq3"
if len(apiKey) <= 0:  
    apiKey="4sl3LmLT5HmTBYpWhDVd9t8nPS33mK0P" 
elif len(apiKey) <= 0:
    apiKey="v5XZWyxsSQD3T5yjVLMDyzpbdMkll6FB"  
elif len(apiKey) <= 0:
    apiKey="ZLYfKxTW1V55rzRWgRbqg8Jd9MhJKhgF"  
elif len(apiKey) <= 0:
    apiKey="KflxhHq38rl0Hh3PJm8bRlNLkf36jQqm"  
elif len(apiKey) <= 0:
    apiKey="SFzZhLBj0HBxhclcKWTpb4YnctHc3THT"  
elif len(apiKey) <= 0:
    apiKey="qTKLVZTjvy64KjJC1KycKTzQNg0jlW8z"  
elif len(apiKey) <= 0:
    apiKey="PRd3b8KZtQ7bqNzY5fdCPTM2lVzZlkkM" 
elif len(apiKey) <= 0:
    apiKey="v5XZWyxsSQD3T5yjVLMDyzpbdMkll6FB" 
elif len(apiKey) <= 0:
    apiKey="ZLYfKxTW1V55rzRWgRbqg8Jd9MhJKhgF" 
elif len(apiKey) <= 0:
    apiKey="4sl3LmLT5HmTBYpWhDVd9t8nPS33mK0P" 
elif len(apiKey) <= 0:
    apiKey="KflxhHq38rl0Hh3PJm8bRlNLkf36jQqm"
assert len(apiKey) > 0, "API KEY is necessary, goto https://tinypng.com, sign up and get your own."
tinify.key = apiKey
fileType = [".png", ".jpg"]
  
def isSupportedFile(filename):
    name, ext = os.path.splitext(filename)
    if ext in fileType:
        return True
    return False

def tinifyPic(targetPath):
    for filename in os.listdir(targetPath):
        filepath = os.path.join(targetPath, filename)
        if os.path.isdir(filepath):  
            tinifyPic(filepath) 
        else:  
            if isSupportedFile(filepath):
                print("Compressing: ", filepath)
                compressed_file = tinify.from_file(filepath)
                compressed_file.to_file(filepath)


if __name__ == '__main__':
    tinifyPic(ImageFilePath)
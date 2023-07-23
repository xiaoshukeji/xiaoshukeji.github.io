import os
try:
    for filename in os.listdir('./'):
        newname = filename.replace('0', '')  #把logo-替换成空白
        os.rename('./'+filename, './'+newname)
except:
    print("o")

try:
    for filename in os.listdir('./'):
        newname = filename.replace('00', '')  #把logo-替换成空白
        os.rename('./'+filename, './'+newname)
except:
    print("o")

try:
    for filename in os.listdir('./'):
        newname = filename.replace('000', '')  #把logo-替换成空白
        os.rename('./'+filename, './'+newname)
except:
    print("o")
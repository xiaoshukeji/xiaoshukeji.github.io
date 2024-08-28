import os

# 假设你要扫描的根目录是 C:
root_directory = './124/'

# 用于保存替换后的文件路径（在这个例子中，实际上并没有替换操作，所以这只是保存了找到的.mp4文件的路径）
replaced_paths = []

# 遍历根目录及其子目录中的所有文件
for dirpath, dirnames, filenames in os.walk(root_directory):
    for filename in filenames:
        # 检查文件名是否以 .mp4 结尾
        if filename.lower().endswith('.png'):
            # 构建文件的完整路径
            file_path = os.path.join(dirpath, filename)

            # 这里我们实际上没有替换操作，因为您提供的替换字符串 '../a_shu/video (1).MP4' 看起来并不是要替换成当前文件路径的
            # 如果您有特定的替换逻辑，请在这里添加它

            # 由于我们没有实际的替换操作，这里只是保存.mp4文件的路径
            replaced_paths.append(file_path)

        # 循环打印找到的.mp4文件的路径
for path in replaced_paths:
    print(path)
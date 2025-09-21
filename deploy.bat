@echo off
echo ========================================
echo GitHub Pages 部署脚本
echo ========================================
echo.
echo 请确保你已经：
echo 1. 在GitHub上创建了名为 'rune-whisper-novel' 的仓库
echo 2. 替换下面命令中的 YOUR_USERNAME 为你的GitHub用户名
echo.
pause
echo.
echo 添加远程仓库...
set /p username="rain1andsnow2a"
git remote add origin https://github.com/%username%/rune-whisper-novel.git
echo.
echo 推送到GitHub...
git push -u origin main
echo.
echo ========================================
echo 部署完成！
echo 请到GitHub仓库设置中启用GitHub Pages
echo 你的网站将在以下地址可访问：
echo https://%username%.github.io/rune-whisper-novel/
echo ========================================
pause
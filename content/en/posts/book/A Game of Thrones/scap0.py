import fileinput
import requests
from bs4 import BeautifulSoup

baseUrl = 'https://www.bookscool.com/en/A-Game-of-Thrones/'
baseFM = """---
title: "A Game of Thrones (C$page)"
date: 2019-10-01T17:$time+07:00
draft: false
images:
  - https://picsum.photos/1024/768/?random
tags:
  - A Game of Thrones
  - George R. R. Martin
categories:
  - Book
series:
  - A Game of Thrones
---"""
baseFT = """
<p align="right">Author:
<a href="https://www.georgerrmartin.com">George R. R. Martin</a>
</p>
"""


def render(text):
    src = ["    ", "   ", "  ", "\n  ", "   ", ". . ."]
    des = ["\n\n", "\n\n", "\n\n", "\n", "\n\n", "..."]
    for step in range(len(src)):
        text = text.replace(src[step], des[step])
    return text


def toStr(num, digit):
    res = str(num)
    bonus = digit - len(res)
    if bonus > 0:
        res = "0" * bonus + res
    return res


def renderTime(secs):
    minutes = int(secs / 60)
    seconds = secs % 60
    res = toStr(minutes, 2) + ":" + toStr(seconds, 2)
    return res


for page in range(1, 73):
    fm = baseFM
    fm = fm.replace("$page", str(page)).replace("$time", renderTime(page))
    fName = "Chapter " + str(page) + ".md"
    f = open(fName, "w+")
    f.write(fm)
    html = requests.get(baseUrl + str(page))
    bsObj = BeautifulSoup(html.text, "html.parser")
    allText = bsObj.findAll(id="content-text")
    f.write(render(allText[0].get_text()) + baseFT)
    f.close()
    lines = open(fName).read().splitlines()
    lines[15] = ""
    open(fName,'w').write('\n'.join(lines))
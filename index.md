---
layout: home
title: 首页
---

欢迎来到**实用软件分享站**！这里聚焦：**靠谱来源、清晰说明、快速到手**。  
👇 最近更新的条目：
<ul>
{% assign items = site.software | sort: "updated" | reverse | slice: 0, 5 %}
{% for s in items %}
  <li>
    <a href="{{ s.url | relative_url }}">{{ s.title }}</a>
    <small>（更新：{{ s.updated | default: s.date | date: "%Y-%m-%d" }}）</small>
  </li>
{% endfor %}
</ul>

> 想投稿？前往
<a href="{{ site.software_repo_url }}/issues/new/choose" target="_blank" rel="noopener">提交入口</a> 。

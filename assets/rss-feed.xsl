<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/rss">
    <html>
      <head>
        <title>TPEN Updates RSS Feed</title>
        <link rel="stylesheet" type="text/css" href="/assets/css/main.css"/>
        <style>
          body { background: var(--darkest); color: var(--light-gray); font-family: 'IBM Plex Sans', sans-serif; }
          .rss-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
          .rss-logo { height: 60px; }
          .rss-title { font-size: 2rem; color: var(--primary-color); }
          .rss-list { list-style: none; padding: 0; }
          .rss-list li { margin-bottom: 2rem; border-bottom: 1px solid var(--gray); padding-bottom: 1rem; }
          .rss-date { color: var(--gray); font-size: 0.9rem; }
          .rss-desc { margin-top: 0.5rem; }
        </style>
      </head>
      <body>
        <div class="rss-header">
          <img src="/assets/img/logo.png" alt="TPEN Logo" class="rss-logo"/>
          <span class="rss-title"><xsl:value-of select="channel/title"/></span>
        </div>
        <ul class="rss-list">
          <xsl:for-each select="channel/item">
            <li>
              <a href="{link}" style="font-size:1.2rem; color: var(--link);"><xsl:value-of select="title"/></a>
              <div class="rss-date"><xsl:value-of select="pubDate"/></div>
              <div class="rss-desc"><xsl:value-of select="description" disable-output-escaping="yes"/></div>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

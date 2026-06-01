UPDATE content_pages
SET markdown = regexp_replace(markdown, 'https?://(www\.)?luxuschocolate\.com[^\s)"]*', 'https://www.luxurychocolate.lv/veikals', 'g')
WHERE markdown ~ 'luxuschocolate\.com';
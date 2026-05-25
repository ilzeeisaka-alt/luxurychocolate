UPDATE public.content_pages
SET markdown = replace(
  replace(
    markdown,
    E'![Royal Printed Chocolate](https://site-804072.mozfiles.com/files/804072/Royal_Printed_Chocolate.jpg)',
    E'![Heart](https://site-804072.mozfiles.com/files/804072/heart_JPG.jpg)\n\n![Royal Printed Chocolate](https://site-804072.mozfiles.com/files/804072/Royal_Printed_Chocolate.jpg)\n\n![Chocolate Printing](https://site-804072.mozfiles.com/files/804072/Chocolate_Printing.jpg)'
  ),
  -- safety: if already present, no double-up (handled by idempotent check below)
  E'![Heart](https://site-804072.mozfiles.com/files/804072/heart_JPG.jpg)\n\n![Heart](https://site-804072.mozfiles.com/files/804072/heart_JPG.jpg)',
  E'![Heart](https://site-804072.mozfiles.com/files/804072/heart_JPG.jpg)'
),
updated_at = now()
WHERE slug = 'par-mums' AND lang = 'lv'
  AND markdown NOT LIKE '%heart_JPG.jpg%';
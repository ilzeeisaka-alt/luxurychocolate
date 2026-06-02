-- Pārvietot "Ēdama papīra apdruka" kategoriju uz 2. pozīciju aiz "Reklāmas šokolāde"
UPDATE public.product_categories
SET sort_order = sort_order + 1
WHERE sort_order >= 2;

UPDATE public.product_categories
SET sort_order = 2
WHERE slug = 'edama-papira-apdruka';
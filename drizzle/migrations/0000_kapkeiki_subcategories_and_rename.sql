UPDATE product_categories SET name = 'Kapkeiki un Brauniji', updated_at = now() WHERE slug = 'kapkeiki';

INSERT INTO product_categories (slug, name, parent_id, sort_order, name_i18n, description_i18n) VALUES
('kapkeiki-3-cm', 'Kapkeiki 3 cm', '0049995d-292e-4a88-820e-7f2ca305f75a', 1, '{}', '{}'),
('kapkeiki-6-cm', 'Kapkeiki 6 cm', '0049995d-292e-4a88-820e-7f2ca305f75a', 2, '{}', '{}');

UPDATE products SET category_id = (SELECT id FROM product_categories WHERE slug = 'kapkeiki-3-cm'), updated_at = now()
WHERE category_id = '0049995d-292e-4a88-820e-7f2ca305f75a' AND name ILIKE '%3-4 cm%';

UPDATE products SET category_id = (SELECT id FROM product_categories WHERE slug = 'kapkeiki-6-cm'), updated_at = now()
WHERE category_id = '0049995d-292e-4a88-820e-7f2ca305f75a' AND name ILIKE '%5-7 cm%';

-- 1. Upsert canonical categories with sort_order matching the source site sidebar
WITH canonical(slug, name, sort_order) AS (
  VALUES
    ('zemenes-sokolade-un-rozes',     'Zemenes Šokolādē un Rozes',           10),
    ('ziemassvetku-davanas',          'Ziemassvētku Dāvanas',                20),
    ('apdrukatas-kuku-sokolades',     'Apdrukātas Kūku Šokolādes',           30),
    ('personalizeta-reklamas-sokolade','Personalizēta Reklāmas Šokolāde',     40),
    ('sokolazu-davanu-kastes',        'Šokolāžu Dāvanu Kastes',              50),
    ('laimes-cepumi',                 'Laimes Cepumi',                       60),
    ('sokolades-maisinos-ar-lentitem','Šokolādes maisiņos ar lentītēm',      70),
    ('sokolades-papira-apdruka',      'Šokolādes Papīra Apdruka',            80),
    ('sokolades-gleznas',             'Šokolādes Gleznas',                   90),
    ('ziemassvetku-piparkukas',       'Ziemassvētku Piparkūkas',            100),
    ('edama-papira-apdruka',          'Ēdama papīra apdruka',               110),
    ('sokolades-sirds',               'Šokolādes Sirds',                    120),
    ('olu-sokolades',                 'Olu Šokolādes',                      130),
    ('medalas-un-monetas',            'Medaļas un Monētas',                 140),
    ('kapkeiki',                      'Kapkeiki',                           150),
    ('svaigi-augli',                  'Svaigi Augļi',                       160),
    ('sagriezti-augli',               'Sagriezti Augļi',                    170),
    ('sokolades-atslegas',            'Šokolādes Atslēgas',                 180),
    ('dzejas-sokolade',               'Dzejas Šokolāde',                    190),
    ('kukas-tortes',                  'Kūkas un Tortes',                    200),
    ('sokolades-laimes-pakavs',       'Šokolādes Laimes Pakavs',            210),
    ('dazadi',                        'Dažādi',                             220)
)
INSERT INTO public.product_categories (slug, name, sort_order)
SELECT slug, name, sort_order FROM canonical
ON CONFLICT (slug) DO UPDATE
  SET name = EXCLUDED.name,
      sort_order = EXCLUDED.sort_order,
      updated_at = now();

-- 2. Reassign products to canonical categories based on their source_url segment
-- source_url pattern: .../interneta-veikals-produkti/item/<category-slug>/<product-slug>/
WITH parsed AS (
  SELECT
    p.id AS product_id,
    (regexp_match(p.source_url, '/item/([^/]+)/[^/]+/?$'))[1] AS cat_slug
  FROM public.products p
  WHERE p.source_url ~ '/item/[^/]+/[^/]+/?$'
)
UPDATE public.products p
SET category_id = c.id,
    updated_at = now()
FROM parsed pa
JOIN public.product_categories c ON c.slug = pa.cat_slug
WHERE p.id = pa.product_id
  AND (p.category_id IS DISTINCT FROM c.id);

-- 3. Push all non-canonical categories to the bottom so canonical ones lead the sidebar
UPDATE public.product_categories
SET sort_order = 9999
WHERE slug NOT IN (
  'zemenes-sokolade-un-rozes','ziemassvetku-davanas','apdrukatas-kuku-sokolades',
  'personalizeta-reklamas-sokolade','sokolazu-davanu-kastes','laimes-cepumi',
  'sokolades-maisinos-ar-lentitem','sokolades-papira-apdruka','sokolades-gleznas',
  'ziemassvetku-piparkukas','edama-papira-apdruka','sokolades-sirds',
  'olu-sokolades','medalas-un-monetas','kapkeiki','svaigi-augli','sagriezti-augli',
  'sokolades-atslegas','dzejas-sokolade','kukas-tortes','sokolades-laimes-pakavs','dazadi'
);

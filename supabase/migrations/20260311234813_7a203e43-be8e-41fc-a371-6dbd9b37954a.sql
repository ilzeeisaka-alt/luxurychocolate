
-- Create storage bucket for client logo uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('client-logos', 'client-logos', true);

-- Allow anyone to upload logos (no auth required for this use case)
CREATE POLICY "Anyone can upload logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'client-logos');

-- Allow public read access to logos
CREATE POLICY "Logos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'client-logos');

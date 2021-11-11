alter table product_reviews add COLUMN IF NOT EXISTS is_reviewed boolean default false;
ALTER TABLE product_reviews ADD CONSTRAINT product_reviews_merchant_id_fkey FOREIGN KEY (merchant_id) REFERENCES admins (id) ON DELETE CASCADE;
ALTER TABLE product_reviews ADD CONSTRAINT product_reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

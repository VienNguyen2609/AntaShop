import React from "react";
import { Layout, HeroBanner, DiscountCodes, ProductSections } from "../components";
import "./HomePage.css";

export default function HomePage() {
  return (
    <Layout>
      <div className="homepage">
        <HeroBanner />
        <DiscountCodes />
        <ProductSections />
      </div>
    </Layout>
  );
}
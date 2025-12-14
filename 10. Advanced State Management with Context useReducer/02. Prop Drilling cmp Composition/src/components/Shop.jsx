export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      {/* 
        Shop is now a layout component:
        - It does NOT know about products or cart logic
        - It simply renders whatever is passed via children
        - This removes unnecessary prop drilling
      */}
      <ul id="products">{children}</ul>
    </section>
  );
}

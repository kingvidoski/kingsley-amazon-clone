import {ImageSlider, Products } from ".";

const HomePage = () => {
  return (
    <main>
      <ImageSlider />
      <div className="main__row">
        <Products
          id="1234756"
          quantity={1}
          title="Logitech G502 HERO High Performance Wired Gaming Mouse, HERO 25K Sensor, 25,600 DPI, RGB, Adjustable Weights, 11 Programmable Buttons, On-Board Memory, PC / Mac"
          price={38}
          kobo={99}
          relPrice={38.99}
          rating={4}
          image="/Images/mouse.jpg"
        />
        <Products
          id="12645656"
          quantity={1}
          title="Floerns Men's Striped Shirts Casual Short Sleeve Button Down Shirts"
          price={24}
          relPrice={24.99}
          kobo={99}
          rating={4}
          image="/Images/men7.webp"
        />
        <Products
          id="1223456"
          quantity={1}
          title="SplashEZ 3-in-1 Splash Pad, Sprinkler for Kids and Wading Pool for Learning Children’s Sprinkler Pool, 60’’ Inflatable Water Summer Toys “from A to Z” Outdoor Play Mat for Babies & Toddlers"
          price={24}
          relPrice={24.13}
          kobo={13}
          rating={4}
          image="/Images/babi.jpg"
        />
      </div>
      <div className="second__row">
        <Products
          id="78fdf"
          quantity={1}
          title="Van Heusen Men's Wrinkl Free Short Sleeve Button Sown Check Shirt"
          price={18}
          relPrice={18.87}
          kobo={87}
          rating={3}
          image="/Images/men1.webp"
        />
        <Products
          id="sbdhgefty7"
          quantity={1}
          title="BENGOO G9000 Stereo Gaming Headset for PS4 PC Xbox One PS5 Controller, Noise Cancelling Over Ear Headphones with Mic, LED Light, Bass Surround, Soft Memory Earmuffs for Laptop Mac Nintendo NES Games"
          price={49}
          relPrice={49.99}
          kobo={99}
          rating={4}
          image="/Images/headsetz.jpg"
        />
      </div>
      <div className="third__row">
        <Products
          id="oijd8"
          quantity={1}
          title="COOFANDY Men's Causal Linen Button Down Shirt Short Sleeve Beach Shirt"
          price={29}
          relPrice={29.99}
          kobo={99}
          rating={4}
          image="/Images/men4.webp"
        />
        <Products
          id="nbmx8"
          quantity={1}
          title="Nintendo Switch with Neon Blue and Neon Red Joy‑Con - HAC-001(-01)"
          price={298}
          relPrice={298.98}
          kobo={98}
          rating={5}
          image="/Images/ps4.webp"
        />
        <Products
          id="asd677"
          quantity={1}
          title="Amazon Essentials Men's Long Sleeve Regular-fit Casual Poplin Shirt"
          price={19}
          relPrice={19.4}
          kobo={40}
          rating={4}
          image="/Images/men8.webp"
        />
      </div>
      <div className="forth__row">
        <Products
          id="nfgd8"
          quantity={1}
          title="HP 15-inch Laptop, 11th Generation Intel Core i5-1135G7, Intel Iris Xe Graphics, 8 GB RAM, 256 GB SSD, Windows 11 Home (15-dy2024nr, Natural silver)"
          price={523}
          relPrice={523.45}
          kobo={45}
          rating={4}
          image="/Images/computa.jpg"
        />
        <Products
          id="tutyhfv"
          quantity={1}
          title="Gaming Chair - Racing Office Computer Ergonomic Video Game Chair with Headrest and Lumbar Pillow"
          price={99}
          relPrice={99.98}
          kobo={98}
          rating={5}
          image="/Images/chair.jpg"
        />
        <Products
          id="knmsdfoiu"
          quantity={1}
          title="Gaming Keyboard RGB USB Wired Rainbow Keyboards Designed for PC Gamers, PS4, PS5, Laptop, Xbox, Nintendo Switch, Orzly - RX-250 Hornet Edition (Black) Brand: Orzly"
          price={16}
          relPrice={16.83}
          kobo={83}
          rating={4}
          image="/Images/keyboard.jpg"
        />
      </div>
    </main>
  );
};

export default HomePage;

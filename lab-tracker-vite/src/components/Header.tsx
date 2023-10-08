import UserButton from "./UserButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <a href="/">
        <h1 className="font-bold text-4xl">Lab Checkout</h1>
      </a>
      <div>
        <UserButton />
      </div>
    </header>
  );
}

/**
 * Functionalities we want:
 * 1) Manage inventory
 *      Groups of items (group ingredients, add to cart, list them as consumed)
 * 2) Scheduling equipments
 * 3) Export protocol into .txt file
 * 3) Possibly log-in through Google account
 *
 *
 * Build on pre-built open source projects (eLab vs grocy) to save time
 *
 * Which language? React vs HTML,CSS, javascript
 * Host through : Netlify, Versel?
 * Database?
 */

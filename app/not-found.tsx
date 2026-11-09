import Link from "next/link";

export default function NotFound() {
  return (
    <div className="letter notfound">
      <p>I couldn&rsquo;t find that page.</p>
      <p>
        Maybe it moved. <Link href="/">Start from the top</Link>.
      </p>
    </div>
  );
}

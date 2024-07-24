import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

function Star({ filled, onClick }: StarProps) {
  return (
    <span className={`star ${filled ? "filled" : ""}`} onClick={onClick}>
      ★
      <style jsx>{`
        .star {
          font-size: 16px;
          cursor: pointer;
          transition: color 0.3s;
        }
        .star.filled {
          color: white;
        }
      `}</style>
    </span>
  );
}

export function StarRating() {
  const searchParams = useSearchParams();
  const ratingFromParams = parseInt(searchParams.get("rating") || "0", 10);
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleClick = (index: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("rating", (index + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          filled={index < ratingFromParams}
          onClick={() => handleClick(index)}
        />
      ))}
      <style jsx>{`
        .star-rating {
          display: flex;
        }
      `}</style>
    </div>
  );
}

export default StarRating;

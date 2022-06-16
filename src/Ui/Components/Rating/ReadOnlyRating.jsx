import { Fragment, useEffect, useState } from "react";

const ReadOnlyRating = (props) => {
  // Get number part
  const [evenRating, setEvenRating] = useState(Math.floor(props.rating));
  // Get 1 decimal fraction
  const [fractionPart, setFractionPart] = useState(
    Math.floor((props.rating % 1) * 100) / 100
  );

  useEffect(() => {
    if (fractionPart > 0.5) {
      setEvenRating(evenRating + 1);
    }
  }, []);

  return (
    <div className="rating rating-sm">
      {[...Array(5)].map((_, idx) => (
        <Fragment key={idx}>
          <input
            type="radio"
            name={`rating-10-star-` + props.name}
            disabled
            className="bg-orange-500 mask mask-star-2 cursor-default"
            checked={evenRating === idx + 1}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default ReadOnlyRating;

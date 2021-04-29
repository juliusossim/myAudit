import React from 'react';

const CustomCarousel = ({
  className,
  content
}) => {
  console.log(content);
  return (
    <section className={`${className} carousel`} aria-label="Gallery">
      <ol className="carousel__viewport">
        {
          content.map(
            (slide) => (
              <li
                key={slide.id}
                id="carousel__slide1"
                className="carousel__slide"
              >
                <div className="carousel__snapper">
                  <div className="slide">
                    {slide.content}
                  </div>
                </div>
              </li>
            )
          )
        }
      </ol>
    </section>
  );
};
export default CustomCarousel;

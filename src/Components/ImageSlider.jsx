import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const ImageSlider = () => {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
    <Carousel {...settings} className='slider'>
        <div>
            <a>
                <img src="/Images/caurosel-img1.jpg" alt="" />
            </a>
        </div>
        <div>
            <a>
                <img src="/Images/caurosel-img2.jpg" alt="" />
            </a>
        </div>
        <div>
            <a>
                <img src="/Images/caurosel-img3.jpg" alt="" />
            </a>
        </div>
        <div>
            <a>
                <img src="/Images/caurosel-img4.jpg" alt="" />
            </a>
        </div>
        <div>
            <a>
                <img src="/Images/caurosel-img5.jpg" alt="" />
            </a>
        </div>
    </Carousel>
    )
}

const Carousel = styled(Slider)`

    & > button{
        opacity: 1;
        height: 100%;
        width: 5vw;
        z-index: 1;
        top: 20%;
    }

    .slick-prev{
        left: 0px;
    }

    .slick-next{
        right: 0px;
    }

    div>a>img{
        width: 100%;
        mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    }
`;

export default ImageSlider

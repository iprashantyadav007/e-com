import Cart from '../components/Cart';
import './products.css';
import React, { useState } from 'react';
import { CartContext } from '../CartContext'; // Import the CartContext

function Products({isOutOfStock}) {
    const [selectedWeight, setSelectedWeight] = useState('500g');
    const [cards, setCards] = useState([]);
  const { addToCart } = useContext(CartContext); // Use context to get addToCart function
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCards(cardData);
    };

    fetchData();
  }, []);


  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
  };
    return (
        <>
            <section className='products'>
                <div className="imagesProducts">
                    <img src="https://placehold.jp/250x350.png"></img>
                </div>
                <div className="contentProducts">
                    <h1>TOMATO & ROASTED GARLiC PASTA SAUCE</h1>
                    <span>Rs.999</span>
                    <button>Add to cart</button>

                    <div className='svgicon'>
                        <svg class="icon icon-accordion color-foreground-text" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M0 3.75156C0 3.47454 0.224196 3.24997 0.500755 3.24997H10.647C10.9235 3.24997 11.1477 3.47454 11.1477 3.75156V5.07505V5.63362V6.10938V13.6616C10.9427 14.0067 10.8813 14.1101 10.5516 14.6648L7.22339 14.6646V13.6614H10.1462V4.25316H1.00151V13.6614H2.6842V14.6646H0.500755C0.224196 14.6646 0 14.44 0 14.163V3.75156Z"></path>
                            <path d="M18.9985 8.08376L11.1477 6.10938V5.07505L19.6212 7.20603C19.8439 7.26203 20 7.46255 20 7.69253V14.1631C20 14.4401 19.7758 14.6647 19.4992 14.6647H17.3071V13.6615H18.9985V8.08376ZM11.1477 13.6616L13.3442 13.6615L13.3443 14.6647L10.5516 14.6648L11.1477 13.6616Z"></path>
                            <path d="M7.71269 14.1854C7.71269 15.6018 6.56643 16.75 5.15245 16.75C3.73847 16.75 2.59221 15.6018 2.59221 14.1854C2.59221 12.7691 3.73847 11.6209 5.15245 11.6209C6.56643 11.6209 7.71269 12.7691 7.71269 14.1854ZM5.15245 15.7468C6.01331 15.7468 6.71118 15.0478 6.71118 14.1854C6.71118 13.3231 6.01331 12.6241 5.15245 12.6241C4.29159 12.6241 3.59372 13.3231 3.59372 14.1854C3.59372 15.0478 4.29159 15.7468 5.15245 15.7468Z"></path>
                            <path d="M17.5196 14.1854C17.5196 15.6018 16.3733 16.75 14.9593 16.75C13.5454 16.75 12.3991 15.6018 12.3991 14.1854C12.3991 12.7691 13.5454 11.6209 14.9593 11.6209C16.3733 11.6209 17.5196 12.7691 17.5196 14.1854ZM14.9593 15.7468C15.8202 15.7468 16.5181 15.0478 16.5181 14.1854C16.5181 13.3231 15.8202 12.6241 14.9593 12.6241C14.0985 12.6241 13.4006 13.3231 13.4006 14.1854C13.4006 15.0478 14.0985 15.7468 14.9593 15.7468Z"></path></svg> Taxes included. Shipping calculated at checkout.
                    </div>
                    <div className='svgicon'>
                        <svg class="icon icon-accordion color-foreground-text" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M9.69502 0.6786C9.91338 0.601796 10.1516 0.603123 10.3691 0.682353L18.2151 3.54058C18.61 3.68445 18.8728 4.05988 18.8728 4.48018V14.4287C18.8728 14.8074 18.6588 15.1537 18.32 15.3231L10.4731 19.2465C10.196 19.385 9.87022 19.3873 9.59117 19.2526L1.45405 15.3244C1.10843 15.1576 0.888794 14.8076 0.888794 14.4239V4.48434C0.888794 4.05997 1.15665 3.68181 1.55699 3.541L9.69502 0.6786ZM6.07999 3.01017L2.5346 4.25719L10.149 7.63545L13.5692 6.118L6.07999 3.01017ZM6.78606 2.76183L14.1997 5.83828L17.5367 4.35774L10.0268 1.62195L6.78606 2.76183ZM1.88879 14.4239L1.88879 5.06467L9.64898 8.50762V18.1701L1.88879 14.4239ZM17.8728 14.4287L10.649 18.0405V8.50762L17.8728 5.30263V14.4287Z" fill-rule="evenodd"></path></svg>
                        Free Shipping On Orders Above Rs. 499
                    </div>

                   
                   <div className='addToContent'>
                   <div className='buttonInc' style={{ margin: '10px 0px ' }}>
                        <button className='count'>+</button>
                        <span>1</span>
                        <button className='count'>-</button>
                    </div>
                    <div className="weight-selection">
                        <select
                            id="weight"
                            value={selectedWeight}
                            onChange={handleWeightChange}
                            disabled={isOutOfStock} // Disable dropdown if out of stock
                        >
                            <option value="500g">500g</option>
                            <option value="1kg">1kg</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                   </div>

                   <p className='contentOfDiscription'>
                   Imagine a whole bunch of freshly roasted garlic hitting hot olive oil. Oh, that sizzle! Ah, that smell! Mm, that feeling of your mouth watering as your mind runs circles around the possibilities! This garlicky tomato-ey sauce contains all those exclamations within its roasty, toasty taste.
                   Get ready to happily repel every vampire you'll ever meet 'cos this garlic-gilded labyrinth is the most fun you'll ever have with this aromatic ingredient.
                   </p>

                </div>
                <Cart/>
            </section>
        </>
    )
}
export default Products;
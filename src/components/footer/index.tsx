import { css } from '@emotion/react';
export const Footer = () => {
    const showSocialLink = true;

    return (
        <>
            <footer className="footer">
                <div className="footer-bg-shape"></div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg">
                                <div className="footer-bottom-text text-center">
                                    Copyright © {" "}
                                    <a href="#" className="bold">
                                        taikula
                                    </a>{" "}
                                    All Rights Reserved.
                                </div>
                            </div>
                            {
                                showSocialLink && <>
                                    <div className="col-lg">
                                        <div className="social-links style--two mt-4 text-center">
                                            <a href="https://twitter.com/TaikulaVPN" target="_blank">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 512 512"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                                </svg>
                                            </a>
                                            <a href="https://www.facebook.com/profile.php?id=100094260150522" target="_blank">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 320 512"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                                                </svg>
                                            </a>
                                            <a href="https://www.youtube.com/@Taikula-VPN" target="_blank">
                                                <svg fill="currentColor" height="1em" width="1em" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 366.259 366.259"><path d="M351.479,71.073c-2.047-7.833-8.614-13.659-16.634-14.758c-50.333-6.899-101.384-10.397-151.737-10.397 c-50.352,0-101.392,3.498-151.697,10.398c-8.02,1.1-14.586,6.926-16.633,14.758c-19.704,75.403-19.704,148.711,0,224.113 c2.047,7.832,8.614,13.659,16.635,14.758c50.339,6.899,101.394,10.397,151.745,10.397c50.353,0,101.389-3.498,151.688-10.398 c8.02-1.1,14.585-6.925,16.632-14.756C371.186,219.794,371.186,146.486,351.479,71.073z M247.165,197.261l-74.357,57.131 c-3.172,2.439-7.006,3.689-10.86,3.689c-2.681,0-5.374-0.604-7.875-1.835c-6.089-3-9.942-9.198-9.942-15.986V125.999 c0-6.789,3.854-12.987,9.942-15.986c6.091-3,13.352-2.281,18.735,1.854l74.357,57.13c4.393,3.373,6.966,8.596,6.966,14.132 C254.13,188.665,251.557,193.888,247.165,197.261z"></path> </svg>
                                            </a>
                                            <a href="https://t.me/taikulaVPN" target="_blank">
                                                <svg stroke="currentColor"
                                                    fill="currentColor" width="1em" height="1em" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path></svg>
                                            </a>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

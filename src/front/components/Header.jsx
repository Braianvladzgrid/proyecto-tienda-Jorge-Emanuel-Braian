import { useState } from "react";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-dark text-white p-3 position-relative">

            <div className="d-flex justify-content-between align-items-center">

                {/* IZQUIERDA */}
                <div className="position-relative">

                    <button
                        className="btn btn-dark fs-4"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>

                    {menuOpen && (
                        <div
                            className="position-absolute bg-white rounded shadow mt-2"
                            style={{ minWidth: "200px", zIndex: 1000 }}
                        >
                            <a href="#" className="dropdown-item">
                                Inicio
                            </a>

                            <a href="#" className="dropdown-item">
                                Productos
                            </a>

                            <a href="#" className="dropdown-item">
                                Ofertas
                            </a>

                            <a href="#" className="dropdown-item">
                                Contacto
                            </a>
                        </div>
                    )}

                </div>

                {/* CENTRO */}
                <div className="position-absolute start-50 translate-middle-x">
                    <h3 className="m-0">
                        Mi Tienda
                    </h3>
                </div>

                {/* DERECHA */}
                <div className="d-flex gap-2">

                    <button className="btn btn-outline-light">
                        🔍
                    </button>

                    <button className="btn btn-light">
                        Login
                    </button>

                </div>

            </div>

        </header>
    );
};
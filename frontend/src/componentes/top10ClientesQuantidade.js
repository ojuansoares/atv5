import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/bg14.css";
import "../index.css";

export default function Top10ClientesQuantidade() {
    const [topClientes, setTopClientes] = useState([]);

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await axios.get("http://localhost:8080/compras");
                const compras = response.data;

                const clienteComprasMap = compras.reduce((acc, compra) => {
                    const cliente = `${compra.clienteNome} (${compra.clienteCpf})`;
                    if (!acc[cliente]) {
                        acc[cliente] = 0;
                    }
                    acc[cliente] += 1;
                    return acc;
                }, {});

                const sortedClientes = Object.entries(clienteComprasMap)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([cliente, total]) => ({ cliente, total }));

                setTopClientes(sortedClientes);
            } catch (error) {
                console.error("Erro ao carregar dados de compras:", error);
            }
        };

        fetchCompras();
    }, []);

    const renderCliente = (cliente, total, key) => (
        <div key={key} className="list-group-item list-group-item-action d-flex justify-content-between">
            <div>
                <p><strong>Nome & CPF:</strong> <span className="cliente-text">{cliente}</span></p>
                <p><strong>Total Consumido:</strong> <span className="total-text">{total}</span></p>
            </div>
        </div>
    );

    return (
        <div>
            <div className="bg14"></div>
            <div className="container-fluid fundo-escuro">
                <div className="list-group">
                    <h2>Top 10 clientes que mais consumiram (Quantidade):</h2>
                    <hr />
                    {topClientes.map(({ cliente, total }) => renderCliente(cliente, total, cliente))}
                </div>
            </div>
        </div>
    );
}

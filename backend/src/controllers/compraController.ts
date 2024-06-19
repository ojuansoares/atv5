import { Request, Response } from "express";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

export default class CompraController {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>){
        this.clientes = clientes;
        this.produtos = produtos
        this.servicos = servicos
    }

    public compraProduto(req: Request, res: Response){
        try {
            const dadosCliente = req.body.cliente
            const compra = req.body.compra

            const clienteAlvo = this.clientes.find(cliente => cliente.getCpf.getValor === dadosCliente.cpf)
            if(clienteAlvo){
                let comprasCliente = clienteAlvo.getProdutosConsumidos

                for(let i = 0; i < compra.quantidade; i++){
                    const produtoComprado = this.produtos.find(produto => produto.getId === compra.id)
                    if(produtoComprado){
                        let compraRealizada = new Produto(0, produtoComprado.getNome, produtoComprado.getDescricao, produtoComprado.getValor)
                        comprasCliente.push(compraRealizada)
                    } else {
                        res.send(`produto não encontrado`)
                    }
                }

                clienteAlvo.setProdutosConsumidos = comprasCliente
                res.send(`foi`)

            } else {
                res.send('Não foram encontrados clientes com esse CPF')
            }
        } catch (error) {
            res.send(error)
        }
    }

    public compraServico(req: Request, res: Response){
        try {
            const dadosCliente = req.body.cliente
            const compra = req.body.compra

            const clienteAlvo = this.clientes.find(cliente => cliente.getCpf.getValor === dadosCliente.cpf)
            if(clienteAlvo){
                let comprasCliente = clienteAlvo.getServicosConsumidos

                for(let i = 0; i < compra.quantidade; i++){
                    const servicoComprado = this.servicos.find(servico => servico.getId === compra.id)
                    if(servicoComprado){
                        let pet = clienteAlvo.getPet(dadosCliente.pet.id)
                        if(pet){
                            let compraRealizada = new Servico(0, servicoComprado.getNome, servicoComprado.getDescricao, servicoComprado.getValor)
                            comprasCliente.push(compraRealizada)
                        } else {
                            res.send(`Pet não encontrado`)
                        }
                    } else {
                        res.send(`serviço não encontrado`)
                    }
                    
                }
                
                clienteAlvo.setServicosConsumidos = comprasCliente
                res.send(`foi`)

            } else {
                res.send('Não foram encontrados clientes com esse CPF')
            }
        } catch (error) {
            res.send(error)
        }
    }
}
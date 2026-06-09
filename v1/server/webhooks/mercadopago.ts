import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import mercadopago from 'mercadopago';

// Configuração do Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || 'TEST-TOKEN'
});

export async function mercadoPagoWebhook(req: FastifyRequest, reply: FastifyReply) {
  const { query } = req;
  const topic = query.topic || query.type;
  const id = query.id || (req.body as any)?.data?.id;

  if (topic === 'payment') {
    try {
      const payment = await mercadopago.payment.findById(Number(id));
      const status = payment.body.status;
      const externalReference = payment.body.external_reference; // ID da fatura no nosso banco

      if (status === 'approved') {
        // 1. Atualizar fatura para 'paid'
        // 2. Atualizar assinatura do tenant para 'active'
        // 3. Desbloquear tenant se estiver suspenso
        console.log(`Pagamento ${id} aprovado para fatura ${externalReference}`);
      }
    } catch (error) {
      console.error('Erro ao processar webhook MP:', error);
      return reply.status(500).send();
    }
  }

  return reply.status(200).send({ received: true });
}

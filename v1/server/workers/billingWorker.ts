import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { subDays, addDays, isSameDay } from 'date-fns';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

export const billingWorker = new Worker('billing-rule', async (job: Job) => {
  // Este job seria agendado via Cron diário
  const tenants = []; // Busca todos os tenants ativos no PostgreSQL

  for (const tenant of tenants) {
    const nextInvoiceDate = new Date(tenant.subscription.currentPeriodEnd);
    const today = new Date();

    // Lógica D-3: Aviso de vencimento em 3 dias
    if (isSameDay(today, subDays(nextInvoiceDate, 3))) {
      await sendNotification(tenant, 'BILLING_REMINDER_D3');
    }

    // Lógica D-0: Dia do Vencimento
    if (isSameDay(today, nextInvoiceDate)) {
      await generateInvoice(tenant);
    }

    // Lógica D+1: Cobrança de atraso
    if (isSameDay(today, addDays(nextInvoiceDate, 1))) {
      await sendNotification(tenant, 'BILLING_OVERDUE_D1');
    }

    // Lógica D+5: SUSPENSÃO DO TENANT
    if (isSameDay(today, addDays(nextInvoiceDate, 5))) {
      await suspendTenant(tenant);
      await sendNotification(tenant, 'ACCOUNT_SUSPENDED_D5');
    }
  }
}, { connection });

async function sendNotification(tenant: any, type: string) {
  // Integração com serviço de Email (Resend) ou WhatsApp (Evolution API)
  console.log(`Enviando notificação ${type} para ${tenant.email}`);
}

async function suspendTenant(tenant: any) {
  // Update no banco: tenant.status = 'suspended'
  console.log(`Tenant ${tenant.slug} suspenso por falta de pagamento.`);
}

async function generateInvoice(tenant: any) {
  // Cria nova fatura no banco e gera link de pagamento no Mercado Pago
}

import { 
  Activity, CheckCircle, Server, 
  Database, Cpu, HardDrive, Globe, RefreshCw, Clock
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const services = [
  { name: 'API Node.js (Fastify)', icon: Server, status: 'up', uptime: '99,99%', latency: '23ms' },
  { name: 'PostgreSQL', icon: Database, status: 'up', uptime: '99,98%', latency: '5ms' },
  { name: 'Redis (BullMQ)', icon: Cpu, status: 'up', uptime: '100%', latency: '1ms' },
  { name: 'Certbot (SSL)', icon: Globe, status: 'up', uptime: '99,95%', latency: '—' },
  { name: 'Storage (S3)', icon: HardDrive, status: 'up', uptime: '99,99%', latency: '45ms' },
];

const cronJobs = [
  { name: 'Régua de Cobrança', schedule: 'Diário, 03:00', lastRun: '10/04 03:00', status: 'success', duration: '2.3s' },
  { name: 'Verificação SSL', schedule: 'Diário, 06:00', lastRun: '10/04 06:00', status: 'success', duration: '1.1s' },
  { name: 'Limpeza de Sessões', schedule: 'A cada 6h', lastRun: '10/04 12:00', status: 'success', duration: '0.4s' },
  { name: 'Fila de E-mails', schedule: 'A cada 1min', lastRun: '10/04 14:32', status: 'success', duration: '0.1s' },
  { name: 'Agregação Analytics', schedule: 'Diário, 02:00', lastRun: '10/04 02:00', status: 'warning', duration: '15.7s' },
];

const recentLogs = [
  { time: '14:32:01', level: 'info', message: 'Email queue: 12 emails enviados' },
  { time: '14:30:00', level: 'info', message: 'Novo tenant registrado: casa-decor' },
  { time: '14:28:45', level: 'warn', message: 'Query lenta detectada: GET /products (> 500ms)' },
  { time: '14:25:12', level: 'info', message: 'Webhook MP: payment.approved #45632' },
  { time: '14:20:00', level: 'info', message: 'SSL renovado para modaplus.com.br' },
  { time: '14:15:33', level: 'error', message: 'Falha ao enviar WhatsApp para +55119...' },
];

export function AdminSystemPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoramento do Sistema</h1>
          <p className="text-gray-500 text-sm">Status em tempo real de todos os serviços.</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />}>Atualizar</Button>
      </div>

      {/* Status Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Activity className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-bold text-emerald-800">Todos os sistemas operacionais</h3>
          <p className="text-sm text-emerald-600">Última verificação: há 30 segundos</p>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-gray-500" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">{service.name}</span>
              </div>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-center">
                <p className="text-xs text-gray-400">Uptime</p>
                <p className="text-sm font-bold text-emerald-600">{service.uptime}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg text-center">
                <p className="text-xs text-gray-400">Latência</p>
                <p className="text-sm font-bold text-gray-900">{service.latency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cron Jobs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <h3 className="font-bold text-gray-900">Cron Jobs & Workers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Job</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Agendamento</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Última Execução</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase">Duração</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cronJobs.map((job) => (
                <tr key={job.name} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{job.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{job.schedule}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{job.lastRun}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-bold",
                      job.status === 'success' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    )}>
                      {job.status === 'success' ? '✓ OK' : '⚠ Lento'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{job.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Logs Recentes</h3>
        </div>
        <div className="divide-y divide-gray-50 font-mono text-xs">
          {recentLogs.map((log, i) => (
            <div key={i} className="px-6 py-3 flex items-start gap-3 hover:bg-gray-50/50">
              <span className="text-gray-400 shrink-0">[{log.time}]</span>
              <span className={cn(
                "shrink-0 uppercase font-bold px-1.5 py-0.5 rounded",
                log.level === 'info' && 'text-blue-700 bg-blue-50',
                log.level === 'warn' && 'text-amber-700 bg-amber-50',
                log.level === 'error' && 'text-red-700 bg-red-50'
              )}>
                {log.level}
              </span>
              <span className="text-gray-700">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Plus, Mail, Shield, Trash2, Crown, UserCheck, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../utils/cn';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'tenant_owner' | 'tenant_user';
  isActive: boolean;
  lastLogin: string;
}

const DEMO_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Usuário Demo', email: 'demo@tvloja.com.br', role: 'tenant_owner', isActive: true, lastLogin: 'Agora' },
];

export function TeamPage() {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(DEMO_MEMBERS);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'tenant_user'>('tenant_user');

  // Simulated plan — Free doesn't have team
  const userPlan: string = 'pro'; // Change to 'free' to test locked state
  const canManageTeam = userPlan === 'business';
  const maxUsers = userPlan === 'business' ? 5 : 1;

  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      toast('error', 'E-mail obrigatório', 'Digite o e-mail do membro.');
      return;
    }
    if (members.length >= maxUsers) {
      toast('warning', 'Limite atingido', `Seu plano permite no máximo ${maxUsers} usuário(s).`);
      return;
    }

    const newMember: TeamMember = {
      id: String(members.length + 1),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      isActive: false,
      lastLogin: 'Convite enviado',
    };
    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInvite(false);
    toast('success', 'Convite enviado!', `Um convite foi enviado para ${inviteEmail}.`);
  };

  const handleRemove = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
    toast('success', 'Membro removido', 'O usuário foi removido da equipe.');
  };

  // Locked state for Free/Pro plans
  if (!canManageTeam) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Gestão de Equipe</h1>
          <p className="text-gray-600 mb-2 max-w-md mx-auto">
            Adicione até <strong>5 usuários</strong> ao painel para ajudar a gerenciar sua loja.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Disponível exclusivamente no plano <strong>Business</strong>.
          </p>

          {/* Current user */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-md mx-auto mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Você (Proprietário)</p>
                <p className="text-sm text-gray-500">demo@tvloja.com.br</p>
              </div>
              <span className="ml-auto px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">Owner</span>
            </div>
          </div>

          <Link to="/dashboard/billing">
            <Button leftIcon={<Zap className="w-4 h-4" />}>
              Fazer upgrade para Business · R$ 99/mês
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equipe</h1>
          <p className="text-gray-500 text-sm">{members.length} de {maxUsers} usuários</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowInvite(true)} disabled={members.length >= maxUsers}>
          Convidar membro
        </Button>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Convidar novo membro</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input placeholder="email@exemplo.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} leftIcon={<Mail className="w-4 h-4" />} />
            </div>
            <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value as 'tenant_user')}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option value="tenant_user">Usuário</option>
            </select>
            <Button onClick={handleInvite}>Enviar convite</Button>
            <Button variant="ghost" onClick={() => setShowInvite(false)}>Cancelar</Button>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Membro</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Papel</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Último acesso</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <span className="text-sm font-bold text-indigo-600">{member.name[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold',
                      member.role === 'tenant_owner' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                    )}>
                      {member.role === 'tenant_owner' ? (
                        <span className="flex items-center gap-1"><Crown className="w-3 h-3" /> Proprietário</span>
                      ) : (
                        <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> Usuário</span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn('px-2 py-1 rounded-full text-xs font-bold',
                      member.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    )}>
                      {member.isActive ? 'Ativo' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{member.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    {member.role !== 'tenant_owner' && (
                      <button onClick={() => handleRemove(member.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions info */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <p className="font-bold text-indigo-800 mb-1">Sobre permissões</p>
            <p className="text-sm text-indigo-700">
              <strong>Proprietário:</strong> Acesso total (editar site, domínio, produtos, faturas, equipe).<br />
              <strong>Usuário:</strong> Acesso limitado (editar site e gerenciar produtos).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

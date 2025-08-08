# MyKanban - Angular 19 + PrimeNG Project

Este é um projeto Angular 19 com PrimeNG já configurado e um exemplo básico de Kanban Board.

## Tecnologias Utilizadas

- **Angular 19** - Framework de desenvolvimento
- **PrimeNG 20** - Biblioteca de componentes UI
- **PrimeIcons** - Ícones para a interface
- **PrimeFlex** - Utilitários CSS para layout

## Funcionalidades Configuradas

- ✅ Angular 19 com standalone components
- ✅ PrimeNG 20 com tema Lara configurado
- ✅ PrimeFlex para utilitários CSS
- ✅ Animações habilitadas
- ✅ Roteamento configurado
- ✅ Exemplo de Kanban Board com componentes PrimeNG
- ✅ Módulos principais do PrimeNG incluídos
- ✅ Angular CDK para drag & drop
- ✅ Tooltips e badges funcionais
- ✅ Avatares de usuários
- ✅ Barras de progresso
- ✅ Tags categorizadas
- ✅ Sistema de notificações (Toast)
- ✅ Diálogos de confirmação

## Comandos Disponíveis

### Desenvolvimento
```bash
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Compila o projeto para produção
npm run test       # Executa os testes unitários
npm run lint       # Verifica código com ESLint
```

### Instalação
```bash
npm install        # Instala todas as dependências
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── app.component.ts      # Componente principal
│   ├── app.component.html    # Template do Kanban Board
│   ├── app.config.ts         # Configuração da aplicação + PrimeNG
│   └── app.routes.ts         # Configuração de rotas
├── styles.css                # Estilos globais
└── main.ts                   # Ponto de entrada da aplicação
```

## Componentes PrimeNG Utilizados

### Módulos Principais
- `ButtonModule` - Botões de ação e navegação
- `CardModule` - Cards para tarefas e colunas do Kanban
- `ToolbarModule` - Barra de ferramentas superior
- `DialogModule` - Modais e diálogos
- `InputTextModule` - Campos de entrada de texto
- `ToastModule` - Notificações toast
- `TableModule` - Tabelas de dados
- `TextareaModule` - Campos de texto multilinha
- `SelectModule` - Campos de seleção/dropdown
- `CheckboxModule` - Caixas de seleção
- `TagModule` - Tags e etiquetas
- `AvatarModule` - Avatares de usuários
- `MenuModule` - Menus de navegação
- `PopoverModule` - Popovers e overlays
- `ConfirmDialogModule` - Diálogos de confirmação
- `TooltipModule` - Tooltips informativos
- `ProgressBarModule` - Barras de progresso
- `ChipModule` - Chips e badges pequenos
- `BadgeModule` - Badges de notificação
- `SplitterModule` - Divisores de layout

### Angular CDK
- `DragDropModule` - Funcionalidade de arrastar e soltar

### Serviços Incluídos
- `MessageService` - Serviço para notificações toast
- `ConfirmationService` - Serviço para diálogos de confirmação

## Como Usar

1. Clone o projeto
2. Execute `npm install` para instalar dependências
3. Execute `npm start` para iniciar o servidor de desenvolvimento
4. Acesse `http://localhost:4200` (ou a porta indicada no terminal)

## Próximos Passos

- Adicionar funcionalidade de arrastar e soltar (drag & drop)
- Implementar formulários para criar/editar tarefas
- Adicionar persistência de dados
- Implementar autenticação de usuários

## Documentação Útil

- [Angular Documentation](https://angular.dev)
- [PrimeNG Documentation](https://primeng.org)
- [PrimeFlex Documentation](https://primeflex.org)

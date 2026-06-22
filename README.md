# Grafana HTML Graphics - Memory Card

Card customizado para o plugin [HTML Graphics](https://grafana.com/grafana/plugins/gapit-htmlgraphics-panel/) no Grafana, exibindo uso de memória com badge de saúde e gráfico SVG interativo.

---

## Preview


<img width="1187" height="282" alt="image" src="https://github.com/user-attachments/assets/f5d966a9-a3d9-47ed-be93-1ef5252b7071" />



---

## Requisitos

- Grafana >= 9.x
- Plugin: `gapit-htmlgraphics-panel`
- Data source: Zabbix (via [grafana-zabbix](https://grafana.com/grafana/plugins/alexanderzobnin-zabbix-app/))
- Item Zabbix: `Memory : percent` (tipo numérico, retorna `0–100`)

---

## Estrutura

```
card/
├── html.html       # Estrutura do card
├── styles.css      # Estilos
└── onrender.js     # Lógica de dados e renderização do gráfico
```

---

## Configuração no Grafana

### Query
<img width="828" height="775" alt="image" src="https://github.com/user-attachments/assets/d0d6cf7b-1fe9-40e8-b496-69a0dac00c67" />

| Campo      | Valor              |
|------------|--------------------|
| Data source | Zabbix            |
| Query type | Metrics            |
| Group      | `/.*/`             |
| Host       | `NOME-DO-HOSTS` |
| Item       | `Memory : percent` |

### Query Options

| Campo    | Valor   |
|----------|---------|
| MD       | auto    |
| Max data points | 500 |
| Interval | 5s     |

---

## Lógica do Badge

| Consumo       | Status   | Cor     |
|---------------|----------|---------|
| 0% – 50%      | ESTÁVEL  | Verde   |
| 51% – 79%     | ATENÇÃO  | Amarelo |
| 80% – 100%    | RUIM     | Vermelho|

---

## Gráfico

- Desenhado com SVG puro, sem dependências externas
- Eixo Y fixo de `0–100%` com linhas de grade sutis
- Área preenchida com gradiente na cor do status atual
- Tooltip interativo ao passar o mouse: exibe horário e valor do ponto

---

## IDs utilizados

| ID             | Elemento         |
|----------------|------------------|
| `card_659qm0`  | Container do card |
| `value`        | Valor percentual  |
| `health-badge` | Badge de status   |
| `chart`        | SVG do gráfico    |

> Se reutilizar o card, altere o `card_659qm0` para um ID único em cada painel.

---

## Licença

Uso interno. Sem restrições de redistribuição.

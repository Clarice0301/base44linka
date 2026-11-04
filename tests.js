// Bancos de questões dos testes do Linka (conteúdo original, didático).
// Formato: { q: pergunta, o: opções, a: índice da resposta correta, e: explicação }

export const LOGIC_QUESTIONS = [
  { q: "Qual número continua a sequência: 2, 4, 8, 16?", o: ["24", "32", "18", "20"], a: 1, e: "Cada termo dobra o anterior: 16 × 2 = 32." },
  { q: "Qual número continua: 1, 4, 9, 16?", o: ["20", "25", "24", "30"], a: 1, e: "São quadrados perfeitos: 5² = 25." },
  { q: "Qual número continua: 3, 6, 11, 18?", o: ["25", "27", "26", "29"], a: 1, e: "Os saltos crescem: +3, +5, +7, +9 → 18 + 9 = 27." },
  { q: "Qual número continua: 81, 27, 9?", o: ["6", "3", "0", "1"], a: 1, e: "Cada termo é dividido por 3: 9 ÷ 3 = 3." },
  { q: "Qual número continua: 1, 1, 2, 3, 5?", o: ["6", "7", "8", "10"], a: 2, e: "Sequência de Fibonacci: 3 + 5 = 8." },
  { q: "Qual número continua: 96, 48, 24?", o: ["18", "16", "12", "20"], a: 2, e: "Cada termo é metade do anterior: 24 ÷ 2 = 12." },
  { q: "Pássaro está para o ar assim como peixe está para...", o: ["terra", "água", "fogo", "céu"], a: 1, e: "Analogia de habitat: o peixe vive na água." },
  { q: "Médico está para hospital assim como professor está para...", o: ["livro", "escola", "aluno", "prova"], a: 1, e: "Analogia de local de trabalho: escola." },
  { q: "Qual número não pertence ao grupo: 3, 5, 7, 9, 11?", o: ["3", "7", "9", "11"], a: 2, e: "Todos são primos, exceto 9 (= 3 × 3)." },
  { q: "Qual número continua: 2, 3, 5, 7, 11?", o: ["12", "13", "14", "15"], a: 1, e: "São números primos em ordem: o próximo é 13." },
  { q: "Qual letra continua: A, C, E, G?", o: ["H", "I", "J", "K"], a: 1, e: "Pulamos uma letra por vez: depois de G vem I." },
  { q: "Qual letra continua: Z, X, V?", o: ["U", "T", "S", "R"], a: 1, e: "Voltando duas letras por vez: depois de V vem T." },
  { q: "Se todos os A são B e todos os B são C, então:", o: ["alguns A são C", "todos os A são C", "nenhum A é C", "não dá para saber"], a: 1, e: "Silogismo clássico: se A ⊂ B e B ⊂ C, então A ⊂ C." },
  { q: "Qual número continua: 15, 14, 12, 9?", o: ["8", "7", "6", "5"], a: 3, e: "Os saltos crescem: −1, −2, −3, −4 → 9 − 4 = 5." },
  { q: "Qual número continua: 4, 12, 6, 18, 9?", o: ["27", "18", "12", "24"], a: 0, e: "Alterna ×3 e ÷2: 9 × 3 = 27." },
  { q: "Se 3 máquinas fazem 3 peças em 3 minutos, 100 máquinas fazem 100 peças em:", o: ["100 minutos", "33 minutos", "3 minutos", "10 minutos"], a: 2, e: "Cada máquina leva 3 minutos por peça; todas trabalham ao mesmo tempo." },
  { q: "Qual figura não pertence ao grupo: quadrado, círculo, triângulo, retângulo?", o: ["quadrado", "círculo", "triângulo", "retângulo"], a: 1, e: "O círculo não tem lados retos; os outros três são polígonos." },
  { q: "Qual número continua: 1, 2, 6, 24?", o: ["30", "48", "120", "96"], a: 2, e: "Multiplicamos por 2, 3, 4, 5: 24 × 5 = 120." },
  { q: "Qual número continua: 7, 14, 28, 56?", o: ["84", "102", "112", "128"], a: 2, e: "Cada termo dobra: 56 × 2 = 112." },
  { q: "Ana é mais alta que Bia. Bia é mais alta que Cris. Quem é a mais baixa?", o: ["Ana", "Bia", "Cris", "Não dá para saber"], a: 2, e: "Ordem de altura: Ana > Bia > Cris." },
  { q: "Quanto é a metade da metade de 12?", o: ["6", "4", "3", "2"], a: 2, e: "Metade de 12 é 6; metade de 6 é 3." },
  { q: "Qual número continua: 10, 11, 13, 16?", o: ["19", "20", "18", "21"], a: 1, e: "Os saltos crescem: +1, +2, +3, +4 → 16 + 4 = 20." },
  { q: "Livro está para capítulo assim como prédio está para...", o: ["porta", "andar", "tijolo", "rua"], a: 1, e: "Analogia de parte e todo: andares compõem o prédio." },
  { q: "Todas as rosas têm espinhos. Esta flor não tem espinhos. Logo:", o: ["pode ser rosa", "não é rosa", "é rosa", "não dá para saber"], a: 1, e: "Sem espinhos, a flor não pode estar no grupo das rosas." },
  { q: "Qual número continua: 1, 3, 6, 10?", o: ["12", "14", "15", "16"], a: 2, e: "Números triangulares: somamos +2, +3, +4, +5 → 10 + 5 = 15." },
  { q: "Qual dia continua: terça, quinta, sábado?", o: ["Domingo", "Segunda", "Sexta", "Quarta"], a: 1, e: "Pulamos um dia por vez: depois do sábado vem a segunda." },
  { q: "Qual número continua: 9, 16, 25?", o: ["36", "49", "32", "42"], a: 0, e: "Quadrados perfeitos: 6² = 36." },
  { q: "Qual letra continua: B, D, F, H?", o: ["I", "J", "K", "L"], a: 1, e: "Pulando uma letra: depois de H vem J." },
  { q: "Se hoje é quarta-feira, que dia será daqui a 100 dias?", o: ["quinta", "sexta", "sábado", "domingo"], a: 1, e: "100 ÷ 7 deixa resto 2: quarta + 2 dias = sexta." },
  { q: "Qual número continua: 2, 6, 12, 20?", o: ["26", "28", "30", "32"], a: 2, e: "Os saltos crescem: +4, +6, +8, +10 → 20 + 10 = 30." },
];

export const PROG_QUESTIONS = [
  { q: "O que é um algoritmo?", o: ["Uma sequência finita de passos para resolver um problema", "Um tipo de computador", "Uma linguagem de programação", "Um erro no código"], a: 0, e: "Algoritmo é a receita: passos ordenados que levam ao resultado." },
  { q: "Em pseudocódigo, 'x ← 5' significa:", o: ["Comparar x com 5", "Guardar 5 na variável x", "Somar 5 a x", "Imprimir x"], a: 1, e: "A seta representa atribuição: x recebe o valor 5." },
  { q: "Um laço 'enquanto (condição)' repete o bloco...", o: ["uma única vez", "nunca", "enquanto a condição for verdadeira", "um número fixo sempre"], a: 2, e: "O enquanto repete enquanto a condição permanece verdadeira." },
  { q: "O que é uma variável?", o: ["Um espaço nomeado que guarda um valor", "Um número que nunca muda", "Um tipo de arquivo", "Uma mensagem de erro"], a: 0, e: "Variável é um nome associado a um valor que pode mudar." },
  { q: "Qual estrutura escolhe entre dois caminhos?", o: ["se / senão", "enquanto", "repita", "lista"], a: 0, e: "A condicional se/senão decide entre caminhos." },
  { q: "O resultado de NOT(verdadeiro) é:", o: ["verdadeiro", "falso", "erro", "nulo"], a: 1, e: "NOT inverte o valor lógico." },
  { q: "O que é uma função?", o: ["Um bloco de código reutilizável com um nome", "Uma variável global", "Um arquivo do sistema", "Um comentário"], a: 0, e: "Função empacota lógica para ser chamada várias vezes." },
  { q: "Em um array (lista), o primeiro elemento geralmente tem índice:", o: ["1", "0", "-1", "depende do tamanho"], a: 1, e: "Índices começam em 0 na maioria das linguagens." },
  { q: "O que é um laço 'para' (for)?", o: ["Repetição com contador definido", "Uma condicional", "Uma função sem nome", "Um tipo de dado"], a: 0, e: "O for repete um número conhecido de vezes usando um contador." },
  { q: "Depurar (debug) significa:", o: ["Apagar o código", "Encontrar e corrigir erros", "Compilar o programa", "Comentar o código"], a: 1, e: "Debug é o processo de localizar e corrigir defeitos." },
  { q: "O que acontece se a condição de parada de um laço nunca for atingida?", o: ["O laço roda para sempre (loop infinito)", "O programa acelera", "O laço roda uma vez", "Nada, é ignorado"], a: 0, e: "Sem parada, o laço nunca termina: loop infinito." },
  { q: "Qual valor lógico resulta de (5 > 3) E (2 > 4)?", o: ["verdadeiro", "falso", "erro", "5"], a: 1, e: "E exige as duas condições verdadeiras; a segunda é falsa." },
  { q: "Um comentário no código serve para:", o: ["Executar instruções", "Explicar o código para pessoas", "Acelerar o programa", "Criar variáveis"], a: 1, e: "Comentários são ignorados pelo computador e ajudam quem lê." },
  { q: "O que é uma entrada (input) de um algoritmo?", o: ["O dado que o algoritmo recebe", "O resultado final", "Um erro", "O nome do arquivo"], a: 0, e: "Entrada é o dado processado; saída é o resultado." },
  { q: "Qual estrutura guarda vários valores sob um mesmo nome?", o: ["Lista (array)", "Variável simples", "Comentário", "Operador"], a: 0, e: "Listas guardam coleções de valores acessíveis por índice." },
];

export const HTML_QUESTIONS = [
  { q: "O que significa HTML?", o: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Machine Language"], a: 0, e: "HTML é a linguagem de marcação das páginas web." },
  { q: "Qual tag cria um título grande (nível 1)?", o: ["<title>", "<h1>", "<header>", "<big>"], a: 1, e: "<h1> é o título de nível mais alto do conteúdo." },
  { q: "Qual tag cria um link?", o: ["<link>", "<a>", "<href>", "<url>"], a: 1, e: "O elemento <a> com href cria links clicáveis." },
  { q: "Qual atributo do <img> descreve a imagem para leitores de tela?", o: ["title", "alt", "src", "desc"], a: 1, e: "O atributo alt é o texto alternativo essencial de acessibilidade." },
  { q: "Qual tag representa conteúdo independente e destacado?", o: ["<div>", "<article>", "<span>", "<section-text>"], a: 1, e: "<article> marca conteúdo autônomo (post, notícia)." },
  { q: "O que faz o CSS?", o: ["Estrutura o conteúdo", "Define o estilo e a aparência", "Processa dados no servidor", "Cria banco de dados"], a: 1, e: "CSS controla cores, fontes, espaçamento e layout." },
  { q: "No box model, a ordem de dentro para fora é:", o: ["margin, border, padding, conteúdo", "conteúdo, padding, border, margin", "border, conteúdo, margin, padding", "padding, margin, border, conteúdo"], a: 1, e: "Conteúdo → padding → borda → margem." },
  { q: "Qual seletor pega elementos pela classe?", o: ["#classe", ".classe", "*classe", "classe()"], a: 1, e: "O ponto seleciona classes; # seleciona ids." },
  { q: "Flexbox serve principalmente para:", o: ["Bancos de dados", "Organizar elementos em linhas e colunas com flexibilidade", "Criar imagens", "Validar formulários"], a: 1, e: "Flexbox alinha e distribui elementos em um eixo." },
  { q: "Qual unidade é relativa ao tamanho da fonte do elemento?", o: ["px", "rem", "cm", "pt"], a: 1, e: "rem é relativa à raiz da fonte, ajudando na acessibilidade." },
  { q: "Qual tag liga um arquivo CSS à página?", o: ["<style src>", "<css>", "<link rel='stylesheet'>", "<script src>"], a: 2, e: "O <link> no head conecta o arquivo .css." },
  { q: "Uma lista com marcadores usa:", o: ["<ol>", "<ul>", "<dl>", "<li-solo>"], a: 1, e: "<ul> é lista sem ordem; <ol> é numerada." },
  { q: "Media queries servem para:", o: ["Criar vídeos", "Adaptar o estilo a diferentes tamanhos de tela", "Ordenar dados", "Compilar CSS"], a: 1, e: "Media queries aplicam estilos conforme a tela (responsividade)." },
  { q: "Qual tag é usada para campos de formulário?", o: ["<form-field>", "<input>", "<text>", "<box>"], a: 1, e: "<input> (e <textarea>, <select>) recebem dados do usuário." },
  { q: "HTML semântico significa:", o: ["Usar apenas <div>", "Usar tags que descrevem o significado do conteúdo", "Escrever em inglês", "Evitar CSS"], a: 1, e: "Tags como <header>, <main>, <footer> dão significado à estrutura." },
];

export const JS_QUESTIONS = [
  { q: "Como se declara uma constante em JavaScript?", o: ["var x = 1", "let x = 1", "const x = 1", "fixed x = 1"], a: 2, e: "const cria um valor que não pode ser reatribuído." },
  { q: "Qual a diferença entre == e ===?", o: ["Nenhuma", "=== compara valor e tipo; == compara só valor", "== compara valor e tipo; === compara só valor", "=== só funciona com números"], a: 1, e: "=== é a comparação estrita, recomendada." },
  { q: "typeof 'olá' retorna:", o: ["'text'", "'string'", "'word'", "'char'"], a: 1, e: "Textos têm o tipo 'string'." },
  { q: "Qual método adiciona um item ao final do array?", o: ["push()", "pop()", "shift()", "join()"], a: 0, e: "push adiciona no fim; pop remove do fim." },
  { q: "O que o método map() devolve?", o: ["O array original modificado", "Um novo array com o resultado para cada item", "Um número", "Nada"], a: 1, e: "map transforma cada item e devolve um novo array." },
  { q: "Como se escreve uma função de seta (arrow function)?", o: ["function => x", "(x) => x * 2", "arrow (x)", "fn: x"], a: 1, e: "A sintaxe de arrow é (parâmetros) => expressão." },
  { q: "Qual valor é 'falsy' em JavaScript?", o: ["'0' (string)", "0 (número)", "[]", "{}"], a: 1, e: "0 é falsy; '0', [] e {} são truthy." },
  { q: "O que é o DOM?", o: ["Um banco de dados", "A árvore de objetos da página que o JS manipula", "Um framework", "Um tipo de arquivo"], a: 1, e: "DOM é a representação da página que o JavaScript altera." },
  { q: "Como se captura um clique em um botão?", o: ["button.onPress()", "button.addEventListener('click', fn)", "click(button)", "button.click = true"], a: 1, e: "addEventListener('click', ...) registra a função do evento." },
  { q: "O que faz o operador ?.", o: ["Compara dois valores", "Acessa propriedades de forma segura quando podem não existir", "Cria condicionais", "Concatena strings"], a: 1, e: "O encadeamento opcional evita erro quando a propriedade é nula." },
  { q: "Qual método espera um Promise ser resolvido?", o: ["await", "wait()", "hold", "sync"], a: 0, e: "await (dentro de async) espera o resultado da Promise." },
  { q: "JSON é:", o: ["Uma linguagem de estilo", "Um formato de texto para trocar dados", "Um banco de dados", "Uma biblioteca"], a: 1, e: "JSON é o formato leve para dados entre sistemas." },
  { q: "O que console.log faz?", o: ["Envia mensagem por e-mail", "Imprime valores no console para inspecionar", "Cria um log no servidor", "Salva em arquivo"], a: 1, e: "É a ferramenta básica de inspeção no navegador." },
  { q: "template literals usam quais aspas?", o: ["aspas simples", "aspas duplas", "crases `", "sem aspas"], a: 2, e: "Cras permitem interpolar variáveis: `Olá, ${nome}`." },
  { q: "try/catch serve para:", o: ["Deixar o código mais rápido", "Capturar e tratar erros sem quebrar o programa", "Criar variáveis", "Ordenar listas"], a: 1, e: "O catch recebe o erro do bloco try para tratamento." },
];

export const SQL_QUESTIONS = [
  { q: "Qual comando busca dados de uma tabela?", o: ["FETCH", "SELECT", "GET", "SHOW"], a: 1, e: "SELECT é o comando de leitura do SQL." },
  { q: "O que o DISTINCT faz?", o: ["Remove linhas duplicadas do resultado", "Ordena o resultado", "Conta linhas", "Junta tabelas"], a: 0, e: "DISTINCT elimina repetições das colunas escolhidas." },
  { q: "Qual cláusula filtra linhas?", o: ["ORDER BY", "WHERE", "GROUP BY", "LIMIT"], a: 1, e: "WHERE aplica a condição sobre as linhas." },
  { q: "SELECT COUNT(*) FROM vendas retorna:", o: ["A soma dos valores", "O número de linhas", "As linhas da tabela", "Uma coluna nova"], a: 1, e: "COUNT(*) conta quantas linhas a consulta retorna." },
  { q: "Qual cláusula agrupa linhas para resumos?", o: ["GROUP BY", "WHERE", "HAVING", "UNION"], a: 0, e: "GROUP BY agrupa por coluna para somar, contar, etc." },
  { q: "O INNER JOIN retorna:", o: ["Tudo das duas tabelas", "Só os registros com par nas duas tabelas", "Só a primeira tabela", "A diferença entre tabelas"], a: 1, e: "Inner join mantém apenas o cruzamento que existe nos dois lados." },
  { q: "O LEFT JOIN retorna:", o: ["Só os pares", "Tudo da tabela da esquerda, mesmo sem par", "Tudo da direita", "Nada"], a: 1, e: "Left join preserva todas as linhas da primeira tabela." },
  { q: "Qual comando insere dados?", o: ["ADD", "INSERT INTO", "PUT", "CREATE ROW"], a: 1, e: "INSERT INTO tabela (...) VALUES (...)." },
  { q: "Qual comando altera dados existentes?", o: ["MODIFY", "UPDATE", "CHANGE", "SET"], a: 1, e: "UPDATE ... SET ... WHERE ... altera registros." },
  { q: "HAVING difere de WHERE porque:", o: ["Filtra após o agrupamento", "É mais rápido", "Só funciona com strings", "É obrigatório"], a: 0, e: "HAVING filtra grupos depois do GROUP BY." },
  { q: "O que faz ORDER BY salario DESC?", o: ["Ordena do maior para o menor salário", "Ordena do menor para o maior", "Remove salários", "Agrupa salários"], a: 0, e: "DESC é decrescente; ASC é crescente." },
  { q: "NULL em SQL significa:", o: ["Zero", "Ausência de valor", "String vazia", "Erro"], a: 1, e: "NULL é a ausência de valor; compare com IS NULL." },
  { q: "Qual cláusula limita o número de linhas retornadas?", o: ["TOP-ONLY", "LIMIT", "MAX", "ROW"], a: 1, e: "LIMIT n (ou FETCH FIRST) restringe o resultado." },
  { q: "Uma chave primária (PRIMARY KEY):", o: ["Pode se repetir", "Identifica unicamente cada linha", "É sempre um texto", "É opcional em toda tabela"], a: 1, e: "A PK garante identidade única de cada registro." },
  { q: "Para somar valores por categoria usamos:", o: ["SUM com GROUP BY", "COUNT com LIMIT", "JOIN sem WHERE", "DISTINCT"], a: 0, e: "SUM(coluna) com GROUP BY categoria soma por grupo." },
];

export const EXCEL_QUESTIONS = [
  { q: "Qual fórmula soma um intervalo?", o: ["=TOTAL(A1:A10)", "=SOMA(A1:A10)", "=SOMAR(A1-A10)", "=ADD(A1:A10)"], a: 1, e: "SOMA (ou SUM) soma os valores do intervalo." },
  { q: "O que A$1 indica na fórmula?", o: ["Referência absoluta de linha", "Um erro", "Uma célula vazia", "Referência circular"], a: 0, e: "O $ trava a linha (referência absoluta) ao copiar a fórmula." },
  { q: "Qual fórmula conta células com números?", o: ["=CONTAR(A1:A10)", "=CONT.SE(A1:A10)", "=SOMA(A1:A10)/2", "=MEDIA(A1:A10)"], a: 0, e: "CONTAR conta valores numéricos; CONT.SE conta com condição." },
  { q: "Qual fórmula devolve um valor quando uma condição é atendida?", o: ["=SE(condição; valor1; valor2)", "=SEVERO()", "=CONDICIONAL()", "=TALVEZ()"], a: 0, e: "SE testa a condição e devolve um dos dois valores." },
  { q: "PROCX (XLOOKUP) serve para:", o: ["Criar gráficos", "Buscar um valor em uma tabela e devolver outro", "Ordenar dados", "Somar colunas"], a: 1, e: "PROCX (e PROCV) faz buscas em tabelas." },
  { q: "Como travar a primeira linha ao rolar a planilha?", o: ["Iniciar sessão", "Congelar painéis", "Bloquear arquivo", "Proteger célula"], a: 1, e: "Congelar painéis mantém cabeçalhos visíveis." },
  { q: "Qual fórmula calcula a média?", o: ["=MEDIA(A1:A10)", "=SOMA(A1:A10)/2 sempre", "=AVG(A1:A10) em português", "=CENTRAL(A1:A10)"], a: 0, e: "MEDIA (ou AVERAGE) devolve a média aritmética." },
  { q: "Uma tabela dinâmica serve para:", o: ["Proteger o arquivo", "Resumir e cruzar grandes volumes de dados", "Imprimir planilhas", "Criar macros automáticas"], a: 1, e: "Tabelas dinâmicas agregam dados por categorias rapidamente." },
  { q: "O que faz a fórmula =CONT.SE(A1:A20;\">100\")?", o: ["Soma valores acima de 100", "Conta quantas células são maiores que 100", "Conta linhas vazias", "Erro de sintaxe"], a: 1, e: "CONT.SE conta as células que atendem à condição." },
  { q: "Formato condicional serve para:", o: ["Formatar o disco", "Colorir células automaticamente conforme regras", "Esconder planilhas", "Exportar PDF"], a: 1, e: "Regras visuais aplicam cores quando condições são atendidas." },
  { q: "Qual símbolo inicia toda fórmula no Excel?", o: ["#", "=", "@", "$"], a: 1, e: "Fórmulas começam com =." },
  { q: "Como referenciar a Planilha2 célula B2?", o: ["=Planilha2!B2", "=B2@Planilha2", "Sheet2.B2", "!Planilha2.B2"], a: 0, e: "O ! separa o nome da planilha da célula." },
  { q: "ARRUMAR (TRIM) faz o quê?", o: ["Remove espaços extras do texto", "Arredonda números", "Ordena colunas", "Mescla células"], a: 0, e: "ARRUMAR limpa espaços duplicados nas pontas e no meio." },
  { q: "Para juntar textos de duas células usamos:", o: ["=A1 & B1 (ou CONCAT)", "=A1 + B1", "=JUNTE(A1)", "=MESCLAR()"], a: 0, e: "& ou CONCAT concatena textos." },
  { q: "Validação de dados serve para:", o: ["Conferir a internet", "Restringir o que pode ser digitado em uma célula", "Validar fórmulas", "Corrigir erros automaticamente"], a: 1, e: "Validação limita entradas (listas, intervalos) e evita erros." },
];

export const TESTS = [
  { id: "logic", title: "Raciocínio lógico", skill: "Raciocínio lógico", bank: LOGIC_QUESTIONS, count: 15, demo: true },
  { id: "prog", title: "Lógica de programação", skill: "Lógica de programação", bank: PROG_QUESTIONS, count: 15 },
  { id: "htmlcss", title: "HTML e CSS", skill: "HTML", bank: HTML_QUESTIONS, count: 15 },
  { id: "js", title: "JavaScript", skill: "JavaScript", bank: JS_QUESTIONS, count: 15 },
  { id: "sql", title: "SQL básico", skill: "SQL", bank: SQL_QUESTIONS, count: 15 },
  { id: "excel", title: "Excel", skill: "Excel", bank: EXCEL_QUESTIONS, count: 15 },
];

export const RETRY_DAYS = 7;

export function levelFor(score) {
  const pct = (score / 15) * 100;
  if (pct >= 90) return 4;
  if (pct >= 70) return 3;
  if (pct >= 50) return 2;
  return 1;
}

export const LEVEL_LABELS = { 1: "Iniciante", 2: "Básico", 3: "Intermediário", 4: "Avançado" };
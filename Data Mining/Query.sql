-- Busca todas as experiências e a média de avaliação delas

SELECT e.title, avg(r.rate) as media FROM rate AS r 
INNER JOIN experiencia as e 
ON e.idexperiencia = r.idexperiencia 
GROUP BY (e.idexperiencia);

-- Busca a quantidade de avaliações das experiências que receberam notas abaixo de 3 (regular)

SELECT e.title, count(r.rate) as total FROM rate AS r 
INNER JOIN experiencia as e ON e.idexperiencia = r.idexperiencia 
WHERE r.rate < 3 
GROUP BY (e.idexperiencia);

-- Busca a média das avaliações entre duas datas 

SELECT e.title, avg(r.rate) as media FROM rate as r 
INNER JOIN experiencia as e ON e.idexperiencia = r.idexperiencia
WHERE r.time BETWEEN '2018-05-05 00:00:00' AND '2018-09-09 00:00:00'
GROUP BY e.idexperiencia;

-- Total de usuários que não possuem nenhuma visualização de experiência

SELECT count(u.nome) AS total FROM usuario AS u 
LEFT JOIN usuario_experiencia AS ue
ON u.idusuario = ue.idusuario
WHERE ue.idusuario IS NULL;
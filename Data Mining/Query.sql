-- Busca todas as experiências e a média de avaliação delas

EXPLAIN ANALYZE SELECT e.title, avg(r.rate) as media FROM rate AS r 
INNER JOIN experiencia as e 
ON e.idexperiencia = r.idexperiencia 
GROUP BY (e.idexperiencia);

-- Busca a quantidade de avaliações das experiências que receberam notas abaixo de 3 (regular)

SELECT e.title, count(r.rate) as total FROM rate AS r 
INNER JOIN experiencia as e ON e.idexperiencia = r.idexperiencia 
WHERE r.rate < 3 
GROUP BY (e.idexperiencia);

-- Busca a média das avaliações entre duas datas 

CREATE INDEX idx_rate_time ON rate USING hash (time);

EXPLAIN ANALYZE SELECT e.title, avg(r.rate) as media FROM rate as r 
INNER JOIN experiencia as e ON e.idexperiencia = r.idexperiencia
WHERE r.time BETWEEN '2018-05-05 00:00:00' AND '2018-09-09 00:00:00'
GROUP BY e.idexperiencia;

-- Total de usuários que não possuem nenhuma visualização de experiência

-- EXPLAIN ANALYZE

SELECT count(u.nome) AS total FROM usuario AS u 
LEFT JOIN usuario_experiencia AS ue
ON u.idusuario = ue.idusuario
WHERE ue.idusuario IS NULL;

-- Todas as avaliações de uma determinada experiência e informações de seus usuários

SELECT e.idexperiencia, e.title, u.nome, r.rate, r.time FROM rate AS r
INNER JOIN usuario AS u
ON r.idusuario = u.idusuario 
INNER JOIN experiencia AS e
ON e.idexperiencia = r.idexperiencia WHERE e.idexperiencia = 2;

-- As datas das avaliações abaixo de um número X em uma experiência Y

SELECT r.time, r.rate, e.idexperiencia FROM rate AS r 
INNER JOIN experiencia as e ON e.idexperiencia = r.idexperiencia 
WHERE r.rate < X AND e.idexperiencia = Y LIMIT 20;

-- Informações de usuários que deram uma avaliação X para uma experiência Y 
-- (Usar indices hash)

CREATE INDEX idx_idaluno ON usuario USING hash (idusuario);

EXPLAIN ANALYZE SELECT u.nome, u.email FROM usuario as u
INNER JOIN rate as r 
ON r.idusuario = u.idusuario
WHERE r.rate = 1 AND r.idexperiencia = 1;


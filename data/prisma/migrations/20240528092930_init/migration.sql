-- CreateTable
CREATE TABLE "Users" (
    "id_utilizador" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "telemovel" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "foto" BYTEA,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_utilizador")
);

-- CreateTable
CREATE TABLE "foto" (
    "id_foto" TEXT NOT NULL,
    "imageData" BYTEA,
    "id_viagem" TEXT NOT NULL,

    CONSTRAINT "foto_pkey" PRIMARY KEY ("id_foto")
);

-- CreateTable
CREATE TABLE "local" (
    "id_local" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "id_viagem" TEXT NOT NULL,
    "classificacao" INTEGER NOT NULL,

    CONSTRAINT "local_pkey" PRIMARY KEY ("id_local")
);

-- CreateTable
CREATE TABLE "Viagem" (
    "id_viagem" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "custos" DOUBLE PRECISION NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "classificacao" INTEGER NOT NULL,
    "id_utilizador" TEXT NOT NULL,
    "pais" TEXT NOT NULL,

    CONSTRAINT "Viagem_pkey" PRIMARY KEY ("id_viagem")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "foto" ADD CONSTRAINT "foto_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "Viagem"("id_viagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "Viagem"("id_viagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "Users"("id_utilizador") ON DELETE RESTRICT ON UPDATE CASCADE;

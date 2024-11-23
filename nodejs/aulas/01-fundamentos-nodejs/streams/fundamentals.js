// Importação de clientes via CSV(Excel)
// 1gb - 1.000.000
// POST /upload import.csv

// 10mb/s - 100s para subir no banco de dados (1024/10)

// 100s -> Inserção no banco de dados

//10mb/s -> 10.000 - utilizando stream, nessa importação cada 1segundo temos 10.000 linhas e podemos ->
//utilizar o stream para registrar os dados no banco de dados enquanto ele é carregado


//Streams ->

//Toda stream tem por padrão um método de leitura.
//Push é um método para enviar as informações
// Métodos no Node como Request, Response, são nativamente streams sendo possível utilizar seus métodos stream.

import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if(i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))//converte a informação para o formato buffer
  
        this.push(buf)
      }
    }, 100)
  }
}



class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback){
    console.log(Number( chunk.toString())* 10)
    callback()
  }
}


new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStream())
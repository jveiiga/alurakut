import { SiteClient } from 'datocms-client';
                /* 4 - Esse fecth/comunidades(resquest) vai cair no recebedorDeRequest */
export default async function recebedorDeRequests(request, response) {
    /* 5 - Vai bater nesse if */
    if (request.method === 'POST') {
        const TOKEN = '6e7c9e9024b0317a6fe901de4179b2';
    /* 6 - Configurar o cliente do DATOCMS pra criar o registro no servidor */
    const cliente = new SiteClient (TOKEN);  
    /* Esperar o registro ser criado ... */
    const registroCriado = await cliente.items.create({
      itemType: " 972030", // ID do Model de "Communities" criado pelo Dato
      ...request.body,
    //   title: "Comunidade de teste",
    //   imageUrl: "https://github.com/jveiiga.png",
    //   creatorSlug: "jveiiga",
    });
    /* ... 7 - Pra trazer uma resposta  */
    response.json({
        dados: 'Algum dado qualquer',
        registroCriado: registroCriado,
    })
} 
    }
    
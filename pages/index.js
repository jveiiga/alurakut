
import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBowWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  
  return(
    <Box as='aside'>
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}/>
        <hr />

        <p>
          <a className="boxLink" href={'https://github.com/${propriedades.githubUser}'}>
            @{propriedades.githubUser}
          </a>
          <hr />
        </p>
        <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio  = 'jveiiga'
  const [comunidades, setComunidades] = React.useState([]); 
  const githubUser = 'jveiiga';
  const pessoasFavoritas = [
  'juunegreiros', 
  'omariosouto', 
  'gustavoguanabara', 
  'akitaonrails',  
  'hanters',
]
// const [seguidores, setSeguidores] = React.useState([];)
// // 0 - Pegar o array de dados do github 
// React.useEffect(function(){
  //GET
// const seguidores = fetch('https//api.github.com/users/peas/followers')
//   .then(function(respostaDoServidor) {
//     return respostaDoServidor.json();
//   })
//   .then(function(respostaCompleta){
//     console.log(respostaCompleta);
//   })
//    },[])
// 1 - Criar um box que vai ter um map, baseado nos items do array que pegamos do Github

// API GraphQL
    fetch('https://graphql.datocms.com/',{
      method: 'POST',
      headers:{
        'Authorization':'cf9f9d1a779cd34ba5cc04d79f1340',
        'Content-Type': 'application/json',
        'Accept': 'aplication/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug   
        }
      }` })
    })  
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) =>  {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      // console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    },[])

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            {/* 1 - Ao clicar no botão, aciona o Submit do formulário*/}
            <form
              onSubmit={function handleCriarComunidade(reset_comunidade) {
                reset_comunidade.preventDefault();
                const dadosDoForm = new FormData(reset_comunidade.target);
                {/* 2 - Pega os dados que estão na tela*/}
                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: usuarioAleatorio,
                }
              {/* 3 - Faz o fetch(busca) para o BARRA/comunidades*/}
                fetch('/api/comunidades', {
                  /*Esse request é do tipo POST*/
                  method:'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  /* 8 - Com essa resposta configurada vamos ter os 'dados'... */
                  const dados = await response.json();
                              /* ...com esse registro criado na nossa página */
                  const comunidade = dados.registroCriado;
                  /*... pra atualizar os dados no ARRAY do setComunidades e definir
                  novamente na tela  */
                   const comunidadesAtualizadas = [...comunidades, comunidade];
                   setComunidades(comunidadesAtualizadas);
                })
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  tyoe="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  area-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBowWrapper>
          <h2 className="smallTitle">
              Meus amigos ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBowWrapper>
          <ProfileRelationsBowWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual}`} key={itemAtual.id}>
                      <img src={itemAtual.imageUrl} /> 
                      <span>{itemAtual.title}</span>
                    </a>
                    
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBowWrapper>
        </div>
      </MainGrid>
    </>
  );
}




import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBowWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  
  return(
    <Box>
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'jveiiga';
  const pessoasFavoritas = [
  'juunegreiros', 
  'omariosouto', 
  'gustavoguanabara', 
  'akitaonrails',  
]

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
          Bem-vindo(a)
          </h1>
          
          <OrkutNostalgicIconSet />
        </Box>
      </div>

      <div className="profileRelationsAreaÒ" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBowWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>

          <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return (
              <li>
                <a href= {`/users/${itemAtual}`} key ={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`} /> 
                  <span>{itemAtual}</span>
                </a>
              </li>
              
            )
          })} 
          </ul>
        </ProfileRelationsBowWrapper>
      </div>
    </MainGrid>
    </>
  );
}



module.exports = ({
  themeName,
  studentName,
  studentNumber,
  mentor,
  selectedOption,
}) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Prijava završnog rada</title>
          <style>
             .pattern-div {
             max-width: 800px;
             margin: auto;
             font-size: 8px;
             flex-direction: column;
            
             }
             .title-div{  
               display: flex;
               justify-content: center;
               align-items: center;
                text-align: center;
            }
             
            
             
          </style>
         
       </head>
       <body id = "body">
          <div class="pattern-div">
   
          <div class="title-div">
          <img src="https://i.ibb.co/1Z2Xj6z/Logo-sveuciliste-u-zadru.jpg" alt="Logo_sveuciliste_u_zadru" border="0">          <h1>Sveučilište u Zadru</h1>
          <h3>Prijava teme završnog rada</h3>
          </div>

          <p>Datum: <strong>${`${today.getDate()}. ${
            today.getMonth() + 1
          }. ${today.getFullYear()}.`}</strong></p>
          <p>Prijedlog naslova teme: <strong>${themeName}</strong></p>
          <p>Student/ica: <strong>${studentName}</strong></p>
          <p>Matični broj studenta: <strong>${studentNumber}</strong></p>
          <p>Mentor:<strong> ${mentor}</strong></p>
          <p>Status studenta:<strong> ${selectedOption}</strong></p>
      
         <p>
         Povjerenstvu za završne i diplomske radove Sveučilišta u Zadru,
          odjela Informacijske tehnologije, podnosim zamolbu za prijavu teme
          diplomskog rada sa gore navedenim podacima.
        

        <p>
          Predajom ove prijave diplomskog rada izjavljujem i potvrđujem da
          ću diplomski rad koji će nastati na temelju ovdje napisanog
          izraditi potpuno samostalno u skladu sa savjetima i komentarima
          mentora i članova povjerenstva za diplomske radove te objavljenu
          literaturu koja je navedena u samom tekstu rada i popisu
          literature.
          </p>
          
          <p>
           Izjavljujem da niti jedan dio mojeg rada neće biti prepisan iz
            necitiranog rada, da niti jednim dijelom svojeg rada neću kršiti
            bilo čija autorska prava i da niti jedan dio rada neće biti
            napisan na nedozvoljeni način.
          </p>

          <p>
            Pri pisanju i sastavljanju rada vodit ću se načelima najbolje
            akademske prakse, što je prvenstveno vezano uz nepovredivost
            autorstva te ispravno citiranje i referenciranje radova drugih
            autora.
          </p>

         <p>
          U slučaju da se u bilo kojem trenutku dokaže kako je rad napisan
          na nedozvoljen način spreman/spremna sam snositi sve posljedice
          takvog čina, uključivo i oduzimanje javne isprave koju ću takvim
          radom steći.
        </p>  
        <span>____________________(potpis studenta)</span>
          </div>
          
       </body>
    </html>
    `;
};

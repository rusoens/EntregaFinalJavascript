let o = 1.0; 
let d = false;
let s = 0.02; 
function anim()
{
    if (d == false)
    {
        o -= s;
        if (o < 0.0)
        {
            o = 0.0;
            d = true;
        }
    }
    else
    {
        o += s;
        if  (o > 1.0)
        {
            o = 1.0;
            d = false;
        }
    }
    
    document.getElementById("logo").style.opacity = o;
}

setInterval(anim, 1000/60);

function cuota(V, n, i){
    return V/(((1+i)**n-1)/((1+i)**n*i))
}

class usuario{
    constructor(DNI, apellido, nombre, edad, TNA){
        this.DNI=DNI
        this.apellido=apellido
        this.nombre=nombre
        this.edad=edad
        this.TNA=TNA
};
};

let inicioFinalizado=0

if(inicioFinalizado=0){
    let usuario1=new usuario(33665140, "Schiller", "Ezequiel", 36, 1);
    let usuario2=new usuario(33016244, "Messi", "Lionel", 37, 0.2);
    let usuario3=new usuario(22432311, "Galperín", "Marcos", 57, 2);
    
    let listaDeUsuarios = [usuario1, usuario2, usuario3];
    
    localStorage.setItem("Lista de Usuarios", JSON.stringify(listaDeUsuarios));

    let inicioFinalizado=1
};

let opcion1=document.getElementById("opcion1");
let opcion2=document.getElementById("opcion2");
let opcion3=document.getElementById("opcion3");

opcion1.onclick=()=>{
    let cantidadDeUsuarios = JSON.parse(localStorage.getItem("Lista de Usuarios")).length;
    swal.fire({
        text: `Actualmente hay ${cantidadDeUsuarios} usuarios en nuestro sistema`,
        icon: "info",
        customClass:{
            confirmButton:'botonMenu',
        },
    });
};




opcion2.onclick=()=>  Swal.fire({
    title: "Ingresar datos del usuario",
    html: `
    <p>DNI</p>
    <input type="number" name="DNI" id="DNI" maxlength="8" />
    <br>
    <p>Apellido</p>
    <input type="text" name="Apellido" id="apellido" />
    <br>
    <p>Nombre</p>
    <input type="text" name="Nombre" id="nombre" />
    <br>
    <p>Edad</p>
    <input type="number" name="edad" id="edad" maxlength="2"/>
    `,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",  
    customClass:{
        confirmButton: 'botonMenu',
        cancelButton: 'botonCancelar',
    },
    preConfirm: () => {
        let DNI=document.getElementById("DNI");
        let apellido=document.getElementById("apellido");
        let nombre=document.getElementById("nombre");
        let edad=document.getElementById("edad");
        swal.fire({
            title: "¿Los datos del usuario a ingresar son correctos?",
            html: `
            <p>DNI: ${DNI.value}</p>
            <p>Apellido: ${apellido.value}</p>
            <p>Nombre: ${nombre.value}</p>
            <p>Edad: ${edad.value}</p>`,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#0000ff",
            cancelButtonText: "Cancelar",
            customClass:{
                confirmButton: 'botonMenu',
                cancelButton: 'botonCancelar',
            },
          }).then((result)=>{
            if(result.isConfirmed){
                listaDeUsuarios=JSON.parse(localStorage.getItem("Lista de Usuarios"));
                listaDeUsuarios.push({
                    DNI: DNI.value,
                    apellido: apellido.value,
                    nombre: nombre.value,
                    edad: edad.value,
                    TNA: 3
                });
                localStorage.setItem("Lista de Usuarios", JSON.stringify(listaDeUsuarios));
                swal.fire({
                    title: "Usuario grabado exitosamente",
                    icon: "success",
                    customClass:{
                        confirmButton: 'botonMenu',
                    },
                });
            }else{
                swal.fire({
                    title: "Proceso cancelado",
                    icon: "error",
                    customClass:{
                        confirmButton: 'botonMenu',
                    },
                });
            }
          });
    },
  });


opcion3.onclick=()=>swal.fire({
    title: "Ingresar DNI",
    html: `
    <input type="number" name="DNI" id="DNI" maxlength="8" />
    `,
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",  
    customClass:{
        confirmButton: 'botonMenu',
        cancelButton: 'botonCancelar',
    },
    preConfirm: () => {
        let vDNI=document.getElementById("DNI");
        listaDeUsuarios=JSON.parse(localStorage.getItem("Lista de Usuarios"));
        let resultado=listaDeUsuarios.find((el)=>el.DNI==vDNI.value);
        if(resultado===undefined){
            swal.fire({
                title: "Usuario no encontrado",
                icon: "error",
                customClass:{
                    confirmButton: 'botonMenu',
                },
            });
        }else{
                swal.fire({
                title: "Los datos del usuario seleccionado son los siguientes:",
                icon: "question",
                html: `
                <p>DNI: ${resultado.DNI}</p>
                <p>Apellido: ${resultado.apellido}</p>
                <p>Nombre: ${resultado.nombre}</p>
                <p>Edad: ${resultado.edad}</p>
                <h2>¿Que desea realizar?</h2>
                `,
                input: "select",
                inputOptions:{
                    consultaFinanciera: "Consulta financiera para el usuario",
                    eliminarUsuario: "Eliminar usuario",
                },
                showCancelButton: true,
                confirmButtonText: "Seleccionar",
                cancelButtonText: "Volver",
                customClass:{
                    confirmButton: 'botonMenu',
                    cancelButton: 'botonCancelar',
                },
                inputValidator: (value)=>{
                        if(value==="consultaFinanciera"){
                            swal.fire({
                                title: "Consulta financiera para el usuario",
                                html: `
                                <p>Ingresar monto a solicitar</p>
                                <br>
                                <input type="number" name="monto" id="monto"/>
                                <br>
                                <p>Ingresar plazo (meses)</p>
                                <br>
                                <input type="number" name="meses" id="meses"/>
                                `,
                                showCancelButton: true,
                                confirmButtonText: "Seleccionar",
                                cancelButtonText: "Volver",
                                customClass:{
                                    confirmButton: 'botonMenu',
                                    cancelButton: 'botonCancelar',
                                },
                                preConfirm: () =>{
                                    let monto=document.getElementById("monto");
                                    let periodo=document.getElementById("meses");
                                    let interes=resultado.TNA/365*30;
                                    swal.fire({
                                        html:`<p>El usuario ${resultado.apellido}, ${resultado.nombre} deberá pagar durante ${periodo.value} meses una cuota mensual de $${cuota(monto.value, periodo.value, interes).toFixed(2)}.</p>
                                        <p>El monto no incluye IVA.</p>`,
                                        icon: "info",
                                        customClass:{
                                            confirmButton: 'botonMenu',
                                        },
                                    });
                                },
                            });
                        }else{
                            swal.fire({
                                title: "¿Está seguro que desea eliminar al siguiente usuario?",
                                html: `
                                <p>DNI: ${resultado.DNI}</p>
                                <p>Apellido: ${resultado.apellido}</p>
                                <p>Nombre: ${resultado.nombre}</p>
                                <p>Edad: ${resultado.edad}</p>
                                `,
                                showCancelButton: true,
                                confirmButtonText: "Aceptar",
                                cancelButtonText: "Cancelar",
                                icon: "question",
                                customClass:{
                                    confirmButton: 'botonMenu',
                                    cancelButton: 'botonCancelar',
                                },
                                preConfirm: () =>{
                                    listaDeUsuarios.splice(listaDeUsuarios.indexOf(resultado),1);
                                    localStorage.setItem("Lista de Usuarios", JSON.stringify(listaDeUsuarios));
                                    swal.fire({
                                        title: "El usuario ha sido eliminado",
                                        customClass:{
                                            confirmButton: 'botonMenu',
                                        },
                                    })
                                },
                            });
                        };
                },
            });
        };
    }
});

        


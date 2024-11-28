function templateRedirect(halaman, params){
    return `/${halaman}:${params}`
 }   

 console.log(templateRedirect('delete', 1))
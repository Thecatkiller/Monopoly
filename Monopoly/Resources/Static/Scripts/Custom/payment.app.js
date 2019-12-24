

$("[name='bn']").on("click", function(){
	if( $(this).is(":checked") ){
   		$('#myModal').modal('show');
   }
});


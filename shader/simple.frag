//precision mediump float;

uniform vec4 light_position;
uniform vec4 light_ambient;
uniform vec4 light_diffuse;
uniform vec4 light_specular;
uniform vec4 material_ambient;
uniform vec4 material_diffuse;
uniform vec4 material_specular;
uniform float material_shininess;

varying vec3 v_vertex;
varying vec3 v_normal;

varying mat4 modelview_matrix;

vec4 directional_light(){
	vec4 color = vec4(0,0,0,1);

	vec3 lightpos = (modelview_matrix * light_position).xyz;

	vec3 normal = normalize(v_normal);

	//vec3 light_vector = normalize(light_position );
	vec3 light_vector = normalize(lightpos - v_normal );

	vec3 reflect_vector = reflect(-light_vector, normal);
	vec3 view_vector = normalize(-v_vertex);

	float kd = max(dot(light_vector, normal), 0.0);
	float ks = pow(max(0.0, dot(reflect_vector, view_vector) ), material_shininess);

	vec4 ambient = material_ambient;
	vec4 diffuse = kd*material_diffuse;
	vec4 specular = ks * material_specular;

	color = ambient + diffuse + specular;
	return color;
}

void main() {
  gl_FragColor = directional_light();
  //gl_FragColor = material_diffuse * light_diffuse;
}
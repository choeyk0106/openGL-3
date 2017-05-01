uniform mat4 mvp_matrix;
uniform mat4 mv_matrix;
uniform mat3 normal_matrix;

attribute vec4 a_vertex;
attribute vec3 a_normal;

varying vec3 v_vertex;
varying vec3 v_normal;

varying mat4 modelview_matrix;

void main() {
  modelview_matrix = mv_matrix;

  v_normal = normalize (normal_matrix * a_normal);
  v_vertex = (mv_matrix * a_vertex).xyz;

  gl_Position = mvp_matrix * a_vertex;
}
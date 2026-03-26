
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** ownlibrary
- **Date:** 2026-03-25
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Registro exitoso crea sesión y muestra el dashboard
- **Test Code:** [TC001_Registro_exitoso_crea_sesin_y_muestra_el_dashboard.py](./TC001_Registro_exitoso_crea_sesin_y_muestra_el_dashboard.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Registration failed - application displayed 'User already exists' error after submitting the registration form.
- No redirect to the root path '/' occurred after attempting registration; current URL remains '/login'.
- Dashboard page did not load and dashboard element is not visible after registration attempt.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/ad028a4d-4feb-4616-8257-84810879d47f
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Login exitoso con credenciales válidas redirige al dashboard
- **Test Code:** [TC002_Login_exitoso_con_credenciales_vlidas_redirige_al_dashboard.py](./TC002_Login_exitoso_con_credenciales_vlidas_redirige_al_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/94a7ffbf-7139-48f3-b79e-bc948ced21e0
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Login fallido muestra error y permanece en login
- **Test Code:** [TC003_Login_fallido_muestra_error_y_permanece_en_login.py](./TC003_Login_fallido_muestra_error_y_permanece_en_login.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/75a459d5-6ce3-4a09-9740-b7b9143a7a59
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Registro fallido por email inválido o faltante muestra validación
- **Test Code:** [TC004_Registro_fallido_por_email_invlido_o_faltante_muestra_validacin.py](./TC004_Registro_fallido_por_email_invlido_o_faltante_muestra_validacin.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/e7895b86-9e04-4ba0-9c40-5202577e608f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Registro fallido por contraseña vacía muestra validación
- **Test Code:** [TC005_Registro_fallido_por_contrasea_vaca_muestra_validacin.py](./TC005_Registro_fallido_por_contrasea_vaca_muestra_validacin.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/82368d74-1cb3-43dd-895a-c52523f9e8c6
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Cambiar entre modos Login y Registro actualiza los campos visibles
- **Test Code:** [TC006_Cambiar_entre_modos_Login_y_Registro_actualiza_los_campos_visibles.py](./TC006_Cambiar_entre_modos_Login_y_Registro_actualiza_los_campos_visibles.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/e95c299f-8604-4412-82a1-461e1ca9dd7a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Acceso al dashboard y visualización del listado de libros tras iniciar sesión
- **Test Code:** [TC007_Acceso_al_dashboard_y_visualizacin_del_listado_de_libros_tras_iniciar_sesin.py](./TC007_Acceso_al_dashboard_y_visualizacin_del_listado_de_libros_tras_iniciar_sesin.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/db1ab575-9e01-4a81-9a3c-db47ec3221e2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Búsqueda por texto filtra el listado de libros
- **Test Code:** [TC008_Bsqueda_por_texto_filtra_el_listado_de_libros.py](./TC008_Bsqueda_por_texto_filtra_el_listado_de_libros.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Search filter did not return any book rows: the table body is empty after searching for 'harry'.
- No matching book rows are present in the DOM after filtering (only table header is visible).
- Expected one or more filtered results to appear when searching 'harry', but none were displayed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/a2542b4f-f01d-4f51-ae87-b718858fa650
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Filtro por género aplica correctamente y actualiza la tabla
- **Test Code:** [TC009_Filtro_por_gnero_aplica_correctamente_y_actualiza_la_tabla.py](./TC009_Filtro_por_gnero_aplica_correctamente_y_actualiza_la_tabla.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/a5ce399a-7551-4c04-8e4b-25f3f66202d2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Crear un nuevo libro (rol con permisos) y verlo en la tabla
- **Test Code:** [TC010_Crear_un_nuevo_libro_rol_con_permisos_y_verlo_en_la_tabla.py](./TC010_Crear_un_nuevo_libro_rol_con_permisos_y_verlo_en_la_tabla.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/63ef62b5-a899-4498-a0d5-e0b12dc2640e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Validación por ISBN duplicado al crear libro mantiene el formulario abierto
- **Test Code:** [TC011_Validacin_por_ISBN_duplicado_al_crear_libro_mantiene_el_formulario_abierto.py](./TC011_Validacin_por_ISBN_duplicado_al_crear_libro_mantiene_el_formulario_abierto.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Error message containing the word 'duplicado' not found on the page after saving the book with ISBN 'ISBN-DUPLICADO'.
- No validation message containing the word 'ISBN' was found on the page after saving.
- The 'Nuevo libro' form was closed after clicking 'Guardar' (dashboard and book table are visible), but the form was expected to remain open on validation error.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/9b35037b-f289-4dd0-bd8c-1edf6ed4bf5e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Editar un libro existente y ver los cambios reflejados en la tabla
- **Test Code:** [TC012_Editar_un_libro_existente_y_ver_los_cambios_reflejados_en_la_tabla.py](./TC012_Editar_un_libro_existente_y_ver_los_cambios_reflejados_en_la_tabla.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/b5e03882-9630-4fcc-aedd-0ed0cabbab7e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Eliminar un libro como admin y verificar que desaparece de la tabla
- **Test Code:** [TC013_Eliminar_un_libro_como_admin_y_verificar_que_desaparece_de_la_tabla.py](./TC013_Eliminar_un_libro_como_admin_y_verificar_que_desaparece_de_la_tabla.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/8b242d1d-63c7-4085-a1d0-22edd6f69318
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Usuario sin rol admin intenta eliminar y ve mensaje de permiso denegado
- **Test Code:** [TC014_Usuario_sin_rol_admin_intenta_eliminar_y_ve_mensaje_de_permiso_denegado.py](./TC014_Usuario_sin_rol_admin_intenta_eliminar_y_ve_mensaje_de_permiso_denegado.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Login failed - 'Invalid credentials' message displayed after submitting non-admin credentials.
- Dashboard page did not load after login - still on the login page (no redirect to the protected area).
- Cannot perform deletion test - 'Eliminar' button and books table were not reachable because authentication did not succeed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/db7043da-c206-4926-971c-c2003d435122
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Activar modo oscuro desde la barra superior (usuario autenticado)
- **Test Code:** [TC015_Activar_modo_oscuro_desde_la_barra_superior_usuario_autenticado.py](./TC015_Activar_modo_oscuro_desde_la_barra_superior_usuario_autenticado.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/1da7e9f0-7c81-4826-8136-9069a32d9815
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Desactivar modo oscuro volviendo a modo claro
- **Test Code:** [TC016_Desactivar_modo_oscuro_volviendo_a_modo_claro.py](./TC016_Desactivar_modo_oscuro_volviendo_a_modo_claro.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/cd5644e7-53a3-4d45-b182-bd59eb22bad7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Cerrar sesión desde la barra superior y volver a Login
- **Test Code:** [TC017_Cerrar_sesin_desde_la_barra_superior_y_volver_a_Login.py](./TC017_Cerrar_sesin_desde_la_barra_superior_y_volver_a_Login.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/04e0c2e8-8c52-4963-9817-35814ff179c9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 Persistencia de tema al recargar (modo oscuro queda aplicado)
- **Test Code:** [TC018_Persistencia_de_tema_al_recargar_modo_oscuro_queda_aplicado.py](./TC018_Persistencia_de_tema_al_recargar_modo_oscuro_queda_aplicado.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/d3a4587b-0cef-448d-b961-5578cb2454aa
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Persistencia de tema al reabrir la app (arranca con modo oscuro)
- **Test Code:** [TC019_Persistencia_de_tema_al_reabrir_la_app_arranca_con_modo_oscuro.py](./TC019_Persistencia_de_tema_al_reabrir_la_app_arranca_con_modo_oscuro.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/746730a5-4861-40f8-b0f7-ddefcaf7f24a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Logout después de activar modo oscuro (flujo combinado)
- **Test Code:** [TC020_Logout_despus_de_activar_modo_oscuro_flujo_combinado.py](./TC020_Logout_despus_de_activar_modo_oscuro_flujo_combinado.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/c9769fc1-2f44-4f78-8d2d-985a2592dad2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Dashboard: la sección Artículos no muestra tabla ni controles de gestión (limitación conocida)
- **Test Code:** [TC021_Dashboard_la_seccin_Artculos_no_muestra_tabla_ni_controles_de_gestin_limitacin_conocida.py](./TC021_Dashboard_la_seccin_Artculos_no_muestra_tabla_ni_controles_de_gestin_limitacin_conocida.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/758848b5-fded-4c9d-a8d3-63937bb9bf85
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC022 Dashboard: al abrir Artículos no aparecen acciones de crear/editar/eliminar (limitación conocida)
- **Test Code:** [TC022_Dashboard_al_abrir_Artculos_no_aparecen_acciones_de_creareditareliminar_limitacin_conocida.py](./TC022_Dashboard_al_abrir_Artculos_no_aparecen_acciones_de_creareditareliminar_limitacin_conocida.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/81169be9-2852-4d6c-a355-1a601c462ec0
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023 Login: credenciales inválidas impiden acceder al dashboard para intentar ver Artículos
- **Test Code:** [TC023_Login_credenciales_invlidas_impiden_acceder_al_dashboard_para_intentar_ver_Artculos.py](./TC023_Login_credenciales_invlidas_impiden_acceder_al_dashboard_para_intentar_ver_Artculos.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/24ad29bc-d44c-4ebd-a3d6-2d218e283248/ee157887-3ea0-4a0c-b7a1-b452901fefef
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **82.61** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---
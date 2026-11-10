app_name = "subculture_site"
app_title = "Subculture"
app_publisher = "Aashir Shaikh"
app_description = "Subculture, a microbiology and biotechnology study site, served at /subculture"
app_email = "aashirshaikh2004@gmail.com"
app_license = "mit"

# The Subculture tile on the apps screen (/desk). Subculture has no desk UI, so the tile opens
# the public page itself; cart_qc is 10 and indiguide_qc is 20, so this sits third.
add_to_apps_screen = [
	{
		"name": "subculture_site",
		"logo": "/assets/subculture_site/icon.svg",
		"title": "Subculture",
		"route": "/subculture",
		"sequence_id": 30,
	}
]

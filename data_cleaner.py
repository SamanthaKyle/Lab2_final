import geopandas as gpd

# read in the file
full_file = gpd.read_file('./data/crime.geojson') # have since deleted this file fyi

# separate by datatype and rename for consistency
just_robbery = full_file[['ROBBERY_RATE_2025', 'geometry']]
just_robbery.rename(columns = {'ROBBERY_RATE_2025': 'DATA'}, inplace=True)
just_theft = full_file[['AUTOTHEFT_RATE_2025', 'geometry']]
just_theft.rename(columns = {'AUTOTHEFT_RATE_2025': 'DATA'}, inplace=True)
just_assault = full_file[['ASSAULT_RATE_2025', 'geometry']]
just_assault.rename(columns = {'ASSAULT_RATE_2025': 'DATA'}, inplace=True)

# write to clean small files
just_robbery.to_file('robbery.geojson', driver = 'GeoJSON')
just_theft.to_file('theft.geojson', driver = 'GeoJSON')
just_assault.to_file('assualt.geojson', driver='GeoJSON')

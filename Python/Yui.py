import asyncio
import traceback
import random
import os
import discord
from discord.ext import commands
import json


bot = commands.Bot(command_prefix="yui-")

bot.config = json.load(open("botconfig.json"))


async def cycle_status():
    statuses = [f"Developing! Yui-help", "I love mama!", "I love papa!"]
    await bot.wait_until_ready()
    while not bot.is_closed():
        await bot.change_presence(activity=discord.Game(name=statuses[0]))
        statuses = statuses[1:] + [statuses[0]]
        await asyncio.sleep(15)

bot.remove_command("help")

ignored_modules = []
bot.loaded_extensions = []


@bot.command()
async def help(ctx):
    embed = discord.Embed(title="Yui Command Help",
                          color=random.randint(0, 256**3 - 1))
    embed.add_field(name="Global commands",
                    value="Yui-hi - say hello to Yui", inline=False)
    embed.add_field(name="Sword Art Online",
                    value="Yui-fight list", inline=False)
    await ctx.send(embed=embed)


for extension in [f.replace('.py', '') for f in os.listdir("Modules") if os.path.isfile(os.path.join("Modules", f)) and f.replace('.py', '') not in ignored_modules]:
    try:
        bot.load_extension("Modules." + extension)
        bot.loaded_extensions.append(extension)
    except (discord.errors.ClientException, discord.ClientException, ModuleNotFoundError):
        traceback.print_exc()
        print(f'Failed to load extension {extension}.')
    except Exception as e:
        traceback.print_exc()
        print(f"Supreme error while loading {extension}")

try:
    bot.loop.create_task(cycle_status())
    # NDU2NzU2MjMyNTczNjgxNjg2.Dgu02w.heCIxplkN37VpbVYc0Qz9_LeOzE
    bot.run("NDI4MTI3ODY4ODcwOTgzNjgw.DhQk-Q.BvIpKVwhUwXZfanyA7NlSkTc7sI")
except Exception as _e:
    traceback.print_exc()
    print(f"! ERROR WHILE BOOTING !\nError:\n{_e}\n\n")

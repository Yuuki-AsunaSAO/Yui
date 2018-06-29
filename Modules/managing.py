import discord
import random
import time
import json
from discord.ext import commands


class Managing:

    def __init__(self, bot):
        self.bot = bot

    @commands.command(hidden=True)
    @commands.is_owner()
    async def kill(self, ctx):
        death_msg = random.choice(["I DON'T WANNA START OVER AT THE GRAVEYARD NOOOOO", "Whyyyyyy Toby!!!", "Shutting down...", "#ded", "#RIPinpepperoni",
                                   "Will I dream?", "I don't hate you.", "No Hard Feelings", "I'm afraid I can't let you do that, Dave", "Rest in Spaghetti Never Forghetti"])
        await ctx.send(embed=discord.Embed(title=death_msg, color=0xFF0000))
        if not death_msg == "I'm afraid I can't let you do that, Dave":
            await self.bot.close()

    # Hidden means it won't show up on the default help.
    @commands.command(name='load', hidden=True)
    @commands.is_owner()
    async def cog_load(self, ctx, *, cog: str):
        """Command which Loads a Module.
        Remember to use dot path. e.g: cogs.owner"""
        try:
            self.bot.load_extension("Modules." + cog)
            self.bot.loaded_extensions.append(cog)
        except Exception as e:
            await ctx.send(f'**`ERROR:`** {type(e).__name__} - {e}')
        else:
            await ctx.send('**`SUCCESS`**')

    @commands.command(name='unload', hidden=True)
    @commands.is_owner()
    async def cog_unload(self, ctx, *, cog: str):
        """Command which Unloads a Module.
        Remember to use dot path. e.g: cogs.owner"""
        try:
            self.bot.unload_extension("Modules." + cog)
            self.bot.loaded_extensions.remove(cog)
        except Exception as e:
            await ctx.send(f'**`ERROR:`** {type(e).__name__} - {e}')
        else:
            await ctx.send('**`SUCCESS`**')

    @commands.command(name='reload', hidden=True)
    @commands.is_owner()
    async def cog_reload(self, ctx, cog="all"):
        """Command which Reloads a Module.
        Remember to use dot path. e.g: cogs.owner"""
        if cog == "all":
            for module in self.bot.loaded_extensions:
                module = "Modules." + module
                startTime = time.clock()
                try:
                    self.bot.unload_extension(module)
                    self.bot.load_extension(module)
                except Exception as e:
                    await ctx.send(f'**`ERROR: {module.split(".")[1]}`** {type(e).__name__} - {e}')
                    self.bot.load_extension(module)
                else:
                    print(f"Reloaded Modules.{module}")
                    await ctx.send(f'**`SUCCESS: `**`Reloaded {module} in {round((time.clock() - startTime)*1000,2)}ms`')
        else:
            startTime = time.clock()
            try:
                self.bot.unload_extension("Modules." + cog)
                self.bot.load_extension("Modules." + cog)
            except Exception as e:
                await ctx.send(f'**`ERROR:`** {type(e).__name__} - {e}')
                self.bot.load_extension("Modules." + cog)
            else:
                print(f"Reloaded Modules.{cog}")
                await ctx.send(f'**`SUCCESS: `**`Reloaded Modules.{cog} in {round((time.clock() - startTime)*1000,2)}ms`')

    @commands.command(name='listmodules', hidden=True)
    @commands.is_owner()
    async def list_extensions(self, ctx):
        description = ""
        for module in self.bot.loaded_extensions:
            description += "\n" + module
        await ctx.send(embed=discord.Embed(title="All modules", description=description, color=0x7289DA))

    @commands.command(hidden=True)
    @commands.is_owner()
    async def reloadconfig(self, ctx):
        self.bot.config = json.load(open(self.bot.con_dir))


def setup(bot):
    bot.add_cog(Managing(bot))
